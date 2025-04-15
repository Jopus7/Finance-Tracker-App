from app.users.models import User


def test_register_user(client, session):
    response = client.post(
        "api/users/register",
        json={
            "first_name": "John",
            "last_name": "Smith",
            "email": "johnsmith@gmail.com",
            "password": "password",
            "default_currency": "USD",
        },
    )

    assert response.status_code == 200

    assert session.query(User).count() == 1

    user = session.query(User).first()

    assert response.json() == {
        "id": user.id,
        "first_name": "John",
        "last_name": "Smith",
        "email": "johnsmith@gmail.com",
        "default_currency": "USD",
    }



def test_update_default_currency(client, session, authenticated_user):

    
    assert authenticated_user.default_currency == "USD"
    
    response = client.patch(
        "api/users/default-currency",
        json={
            "currency_update": "EUR",
        }
    )
    assert response.status_code == 200
    assert authenticated_user.default_currency == "EUR"
    
    
    
