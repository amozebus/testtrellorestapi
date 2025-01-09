import { Configuration, Value } from "@itgorillaz/configify";

@Configuration()
export class AuthConfig {
  @Value('SECRET_KEY')
  secret: string;

  @Value('ACCESS_TOKEN_EXPIRE', {
    default: '300s'
  })
  accessTokenExpire: string
}