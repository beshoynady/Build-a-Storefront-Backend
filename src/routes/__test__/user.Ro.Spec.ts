import supertest from 'supertest'
import app from '../../index'
import db from '../../database/pool'
import userModel, { users } from '../../models/users.mo'

const UserModel = new userModel()
const request = supertest(app)
let token = ''

describe('Test User Api end point', () => {
  const user = {
    user_name: 'test0',
    first_name: 'test0',
    last_name: 'test0',
    password: 'test0'
  } as users

  beforeAll(async () => {
    const createNewUser = await UserModel.createNewUser(user)
    user.user_id = createNewUser.user_id
  })

  afterAll(async () => {
    const connection = await db.connect()
    const sql = `DELETE FROM users`
    await connection.query(sql)
    connection.release()
  })

  describe('Test Authentication Method', () => {
    it('should be able to authenticate to get token ', async () => {
      const res = await request
        .post('/api/users/login')
        .set('Content-type', 'application/json')
        .send({ user_name: 'test0', password: 'test0' })
      expect(res.status).toBe(200)
      const {
        user_id,
        user_name,
        first_name,
        last_name,
        token: userToken
      } = res.body.data
      expect(user_id).toBe(user.user_id)
      expect(user_name).toBe(user.user_name)
      expect(first_name).toBe(user.first_name)
      expect(last_name).toBe(user.last_name)
      token = userToken
    })

    it('Entering the wrong username test', async () => {
      const res = await request
        .post('/api/users/login')
        .set('Content-type', 'application/json')
        .send({ user_name: 'no one', password: '55555' })
      expect(res.status).toBe(401)
    })
  })
  describe('Testing CRUD for USER MODEL', () => {
    it('Create new User', async () => {
      const res = await request
        .post('/api/users/')
        .set('Content-type', 'application/json')
        .send({
          user_name: 'newtest',
          first_name: 'newtest',
          last_name: 'newtest',
          password: 'newtest'
        } as users)
      expect(res.status).toBe(200)
      const { user_name, first_name, last_name } = res.body.User.newUser
      expect(user_name).toBe('newtest')
      expect(first_name).toBe('newtest')
      expect(last_name).toBe('newtest')
    })

    it('should get list of users', async () => {
      const res = await request
        .get('/api/users/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.User.allUsers.length).toBe(2)
    })

    it('should get one of users', async () => {
      const res = await request
        .get(`/api/users/${user.user_id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      const { user_id, user_name, first_name, last_name } =
        res.body.User.user
      expect(user_id).toBe(user.user_id)
      expect(user_name).toBe('test0')
      expect(first_name).toBe('test0')
      expect(last_name).toBe('test0')
    })

    it('should update one of users', async () => {
      const res = await request
        .patch(`/api/users/${user.user_id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          ...user,
          user_name: 'testup',
          first_name: 'testup',
          last_name: 'testup'
        })
      expect(res.status).toBe(200)
      const { user_id, user_name, first_name, last_name } =
        res.body.User.userUpdate
      expect(user_id).toBe(user.user_id)
      expect(user_name).toBe('testup')
      expect(first_name).toBe('testup')
      expect(last_name).toBe('testup')
    })

    it('should delete one of users', async () => {
      const res = await request
        .delete(`/api/users/${user.user_id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.user_id).toBe(user.user_id)
      expect(res.body.data.user_name).toBe('testup')
    })
  })
})
