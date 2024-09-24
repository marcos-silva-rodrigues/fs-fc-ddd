
export abstract class PersistenceUseCase<R> {
    constructor(
        protected repository: R
    ) {
    }
}