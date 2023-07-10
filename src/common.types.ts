export type CreateUser = {
  email: string;
  password: string;
};

export enum EmailTypes {
  VERIFY,
  RESET,
}

export type SendEmail = {
  email: string;
  emailType: EmailTypes;
  userId: string;
};
