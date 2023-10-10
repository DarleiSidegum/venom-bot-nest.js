export type IFilterOptions<T, B> = {
    [P in keyof T]?: T[P];
} &
    {
        [P in keyof B]?: B[P];
    };
