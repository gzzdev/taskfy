from apps.users.domain.models import UserEntity
from apps.users.infrastructure.models import User

def sign_up(user: UserEntity) -> User:
    return User.objects.create_user(
        username=user.username,
        email=user.email,
        password=user.password
    )