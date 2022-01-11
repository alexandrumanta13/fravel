export interface Languages {
    id?: string | number;
    isDefault: boolean;
    key: string;
    language: string;
    locale: string;
    flag?: string
}[];

export interface Language {
    id?: string | number;
    isDefault: boolean;
    key: string;
    language: string;
    locale: string;
    flag?: string
};
