import userModel, { users } from '../users.mo'
import db from '../../database/pool'

const UserModel = new userModel()

describe('UserModel Unit Testing', () => {
  describe('Testing the existince of the methods first', () => {
    it('should have Create one user methode', () => {
      expect(UserModel.createNewUser).toBeDefined()
    })

    it('should have Get all users methode', () => {
      expect(UserModel.showAllUsers).toBeDefined()
    })

    it('should have Get one user methode', () => {
      expect(UserModel.getUserById).toBeDefined()
    })

    it('should have update one user methode', () => {
      expect(UserModel.updateUserById).toBeDefined()
    })

    it('should have delete user methode', () => {
      expect(UserModel.deleteUserById).toBeDefined()
    })

    it('should have authenticate one user methode', () => {
      expect(UserModel.authenticateUser).toBeDefined()
    })
  })
  describe('Testing the loginc of the userModel', () => {
    const user = {
      user_name: 'tessdasdt',
      first_name: 'test',
      last_name: 'test',
      password: 'test'
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

    it('get all  users should  return all users in db ', async () => {
      const users = await UserModel.showAllUsers()
      expect(users.length).toBe(1)
    })

    it('Create new  user should  return the new user in db ', async () => {
      const user = {
        user_name: 'test',
        first_name: 'test',
        last_name: 'test',
        password: 'test'
      } as users
      const createNewUser = await UserModel.createNewUser(user)
      user.user_id = createNewUser.user_id
      expect(createNewUser.user_id).toBe(user.user_id)
      expect(createNewUser.user_name).toBe(user.user_name)
      expect(createNewUser.first_name).toBe(user.first_name)
      expect(createNewUser.last_name).toBe(user.last_name)
    })

    it('get one  user should  return specific in db ', async () => {
      const oneUser = await UserModel.getUserById(user.user_id)
      expect(oneUser.user_id).toBe(user.user_id)
      expect(oneUser.user_name).toBe(user.user_name)
      expect(oneUser.first_name).toBe(user.first_name)
      expect(oneUser.last_name).toBe(user.last_name)
    })
    it('update one  user should  return the updated user in db ', async () => {
      const updatedUser = await UserModel.updateUserById({
        ...user,
        first_name: 'testTO',
        last_name: 'testLO'
      })
      expect(updatedUser.user_id).toBe(user.user_id)
      expect(updatedUser.user_name).toBe(user.user_name)
      expect(updatedUser.first_name).toBe('testTO')
      expect(updatedUser.last_name).toBe('testLO')
    })
    it('delete one  user should  return the deleted one  in db ', async () => {
      const deleteUser = await UserModel.deleteUserById(
        user.user_id as string
      )
      expect(deleteUser.user_id).toBe(user.user_id)
      const users = await UserModel.showAllUsers()
      expect(users.length).toBe(1)
    })
  })
  describe('Testing the authentication of user', () => {
    const user = {
      user_name: 'test',
      first_name: 'test',
      last_name: 'test',
      password: 'test'
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
    it('Authenticate method should return  the authenticated user', async () => {
      const authenticatedUser: users | null =
        await UserModel.authenticateUser(
          user.user_name,
          user.password
        )
      expect(authenticatedUser?.user_name).toBe(user.user_name)
      expect(authenticatedUser?.first_name).toBe(user.first_name)
      expect(authenticatedUser?.last_name).toBe(user.last_name)
    })
    it('Authenticate method should return null for wrong credential', async () => {
      const authenticatedUser = await UserModel.authenticateUser(
        'asfaj@osdjf.com',
        'fakeMan'
      )
      expect(authenticatedUser).toBe(null)
    })
  })
})
