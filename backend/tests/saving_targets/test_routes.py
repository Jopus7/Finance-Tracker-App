from fastapi import status

from app.saving_targets.models import SavingTarget

def test_create_saving_target(client, authenticated_user, session):
    
    response = client.post(
        "api/saving-targets",
        json={
            "name": "Car",
            "target_amount": 20000.0
        },
    )

    assert response.status_code == 200

    assert session.query(SavingTarget).count() == 1
    saving_target = session.query(SavingTarget).first()

    assert response.json() == {
        "id": saving_target.id,
        "name": "Car",
        "target_amount": 20000.0,
        "current_amount": 0.0,
        "user_id": authenticated_user.id
    }
