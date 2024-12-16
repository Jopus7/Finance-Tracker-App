from datetime import date

from sqlalchemy.orm import Session

from app.categories.models import Category
from app.db.connection import engine
from app.expenses.models import Expense
from app.users.models import User


def seed_database():
    with Session(engine) as session:
        users = [
            User(email="john.doe@gmail.com", first_name="John", last_name="Doe", password="password"),
            User(email="jane.smith@gmail.com", first_name="Jane", last_name="Smith", password="password"),
        ]

        session.add_all(users)
        session.flush()

        categories = {cat.name: cat for cat in session.query(Category).all()}

        expenses_template = [
            ("Weekly Groceries", "Walmart shopping", 156.78, date(2024, 3, 1), categories["Groceries"]),
            ("Monthly Groceries", "Costco bulk buy", 345.67, date(2024, 3, 15), categories["Groceries"]),
            ("Electricity Bill", "February power bill", 89.99, date(2024, 2, 28), categories["Bills"]),
            ("Internet Bill", "Monthly internet", 59.99, date(2024, 3, 1), categories["Bills"]),
            ("Flight Tickets", "Summer vacation", 578.90, date(2024, 3, 10), categories["Travel"]),
            ("Hotel Booking", "Beach resort", 899.99, date(2024, 3, 10), categories["Travel"]),
            ("Cinema", "Movie night", 35.00, date(2024, 3, 5), categories["Entertainment"]),
            ("Concert Tickets", "Rock concert", 150.00, date(2024, 3, 20), categories["Entertainment"]),
            ("Doctor Visit", "Annual checkup", 125.00, date(2024, 3, 2), categories["Healthcare"]),
            ("Pharmacy", "Prescription medicines", 45.67, date(2024, 3, 3), categories["Healthcare"]),
            ("Online Course", "Python programming", 199.99, date(2024, 3, 1), categories["Education"]),
            ("Books", "Technical books", 89.99, date(2024, 3, 15), categories["Education"]),
            ("New Shoes", "Running shoes", 129.99, date(2024, 3, 8), categories["Shopping"]),
            ("Clothes", "Winter jacket", 199.99, date(2024, 3, 12), categories["Shopping"]),
        ]

        for user in users:
            for name, description, amount, date_, category in expenses_template:
                expense = Expense(
                    name=name, description=description, amount=amount, date=date_, user=user, category=category
                )
                session.add(expense)

        session.commit()


if __name__ == "__main__":
    seed_database()
