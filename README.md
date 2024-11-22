# Vehicle Inventory System

A full-stack web application for managing vehicle inventories, designed for three types of users: **Customers**, **Admins**, and **Service Providers**. The system supports authentication, role-based content display, and core inventory management features.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup Instructions](#setup-instructions)
4. [Folder Structure](#folder-structure)
5. [API Endpoints](#api-endpoints)
6. [User Roles](#user-roles)

---

## Features

- **Authentication**
  - Role-based login for Admin, Customer, and Service Provider
  - JWT-based secure authentication
- **Inventory Management**
  - Add, update, delete, and view vehicles
  - Filter and search for vehicles by make, model, year, and more
- **Pagination**
  - Manage large inventories with pagination
- **Role-Based Features**
  - Admin: Full access to all system functionalities
  - Service Provider: Manage vehicles they own
  - Customer: Browse and filter vehicles

---

## Technologies Used

### Frontend
- React.js
- Bootstrap 4.1.1
- React Router

### Backend
- Node.js
- Express.js
- MongoDB

### Other Tools
- JWT for authentication
- bcrypt for password hashing

---

## Setup Instructions

### Prerequisites

1. Node.js and npm installed on your machine
2. MongoDB connection string (ensure MongoDB is running)
3. Git for version control

### Clone Repository

```bash
git clone https://github.com/your-username/vehicle-inventory-system.git
cd vehicle-inventory-system
