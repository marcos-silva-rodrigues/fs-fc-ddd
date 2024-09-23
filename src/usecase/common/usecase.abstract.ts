
export abstract class AbstractUseCase<R, I, O> {
    constructor(
        protected repository: R
    ) {
    }

    abstract execute(input: I): Promise<O>;
}

