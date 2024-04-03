import { InternalServerError, NotFoundException } from "../../lib/exceptions"
import { PersonRespository } from "../../modules/person/person.repository"
import { PersonService } from "../../modules/person/person.service"
import { getResult, newPerson } from "./__mocks__/repository.mocks"
jest.mock("../../modules/person/person.repository")

const PersonRepositoryMock = PersonRespository as jest.Mock<PersonRespository>

function sutFactory() {
  const personRepository =
    new PersonRepositoryMock() as jest.Mocked<PersonRespository>

  const sut = new PersonService(personRepository)
  return { sut, personRepository }
}

describe("PersonService", () => {
  describe("Given that I want to create a new person", () => {
    describe("When I pass the right props", () => {
      test("Then should the person be created", async () => {
        const { sut, personRepository } = sutFactory()
        personRepository.insert.mockResolvedValueOnce(getResult)
        const person = await sut.create(newPerson)
        expect(personRepository.insert).toHaveBeenCalledTimes(1)
        expect(person).toBeDefined()
        expect(typeof person.id).toBe("string")
      })
    })

    describe("When an repository error occure", () => {
      test("Then should an Internal Server Error be thrown", async () => {
        const { sut, personRepository } = sutFactory()
        personRepository.insert.mockRejectedValue(new InternalServerError())
        expect(sut.create(newPerson)).rejects.toThrow(InternalServerError)
      })
    })
  })

  describe("Given that I want to get a person by its public id", () => {
    describe("When I provide an existing id", () => {
      test("Then should the person be returned", async () => {
        const { sut, personRepository } = sutFactory()
        personRepository.findByUuid.mockResolvedValueOnce(getResult)
        const person = await sut.getById({
          personId: "6d2cd028-4795-47ad-a463-8fb745fbf291",
        })
        expect(person).toBeDefined()
        expect(person.id).toBe("6d2cd028-4795-47ad-a463-8fb745fbf291")
      })
    })
    describe("When I provide an inexisting id", () => {
      test("Then should not found exception be thrownd", async () => {
        const { sut, personRepository } = sutFactory()
        personRepository.findByUuid.mockResolvedValueOnce(undefined)
        expect(
          sut.getById({
            personId: "6d2cd028-4795-47ad-a463-8fb745fbf291",
          })
        ).rejects.toThrow(NotFoundException)
      })
    })
  })

  describe("Given I want to return a list o person", () => {
    describe("When I call the service", () => {
      test("Then should a paginated list of persons be returned", async () => {
        const { sut, personRepository } = sutFactory()
        personRepository.findMany.mockResolvedValueOnce({
          page: 1,
          pages: 1,
          length: 1,
          items: [getResult],
        })
        const persons = await sut.getMany({})
        expect(persons.length).toBe(1)
        expect(persons.items[0].id).toBe("6d2cd028-4795-47ad-a463-8fb745fbf291")
      })
    })
  })

  describe("Given I want to return a list o person", () => {
    describe("When I call the service", () => {
      test("Then should a paginated list of persons be returned", async () => {
        const { sut, personRepository } = sutFactory()
        personRepository.findMany.mockResolvedValueOnce({
          page: 1,
          pages: 1,
          length: 1,
          items: [getResult],
        })
        const persons = await sut.getMany({})
        expect(persons.length).toBe(1)
        expect(persons.items[0].id).toBe("6d2cd028-4795-47ad-a463-8fb745fbf291")
      })
    })
  })

  describe("Given I want delete a person", () => {
    describe("When I provide an existing id", () => {
      test("Then should the person be returned", async () => {
        const { sut, personRepository } = sutFactory()
        personRepository.findByUuid.mockResolvedValueOnce(getResult)
        await sut.deletePersonById({
          personId: "6d2cd028-4795-47ad-a463-8fb745fbf291",
        })
        expect(personRepository.findByUuid).toHaveBeenCalledTimes(1)
        expect(personRepository.deletePerson).toHaveBeenCalledTimes(1)
      })
    })
    describe("When I provide an existing personId", () => {
      test("Then should not found exception be thrownd", async () => {
        const { sut, personRepository } = sutFactory()
        personRepository.findByUuid.mockResolvedValueOnce(undefined)
        expect(
          sut.deletePersonById({
            personId: "6d2cd028-4795-47ad-a463-8fb745fbf291",
          })
        ).rejects.toThrow(NotFoundException)
      })
    })
  })

  describe("Given I want to update a person", () => {
    describe("When I pass a existing personId", () => {
      describe("And valid props", () => {
        test("Then the person should be updated", async () => {
          const { sut, personRepository } = sutFactory()
          personRepository.findByUuid.mockResolvedValueOnce(getResult)
          personRepository.update.mockResolvedValueOnce({
            ...getResult,
            name: "João",
          })
          const updatedPerson = await sut.updatePerson({
            personId: "6d2cd028-4795-47ad-a463-8fb745fbf291",
            name: "João",
          })
          expect(updatedPerson.name).toBe("João")
          expect(personRepository.findByUuid).toHaveBeenCalledTimes(1)
        })
      })
    })
    describe("When I pass a inexisting personId", () => {
      test("Then an not found exception should be thrown", async () => {
        const { sut, personRepository } = sutFactory()
        personRepository.findByUuid.mockResolvedValueOnce(undefined)
        expect(
          sut.updatePerson({
            personId: "inexistingId",
            name: "João",
          })
        ).rejects.toThrow(NotFoundException)
      })
    })
  })
  describe("When I pass a existing personId but the server has an error", () => {
    test("Then an Internal Server Error should be thrown", async () => {
      const { sut, personRepository } = sutFactory()
      personRepository.findByUuid.mockResolvedValueOnce(getResult)
      personRepository.update.mockRejectedValue(new InternalServerError())
      expect(
        sut.updatePerson({
          personId: "inexistingId",
          name: "João",
        })
      ).rejects.toThrow(InternalServerError)
    })
  })
})
