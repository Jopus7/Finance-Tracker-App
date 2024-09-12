from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: str | None = None


class OAuth2EmailRequestForm(BaseModel):
    email: str
    password: str
