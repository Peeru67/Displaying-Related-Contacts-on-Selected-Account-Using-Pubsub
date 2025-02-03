# Display Related Contacts Using Accounts (PubSub)

## Overview

This project demonstrates how to use **Lightning Web Components (LWC)** with **PubSub** to communicate between components. It allows users to **search for accounts**, **view related contacts**, and **navigate between sections**.

## Features

- ✔ **Account Search**: Users can search for accounts.
- ✔ **Account Details**: Displays selected account details.
- ✔ **Contact Details**: Shows contacts related to the selected account.
- ✔ **PubSub Communication**: Uses a custom PubSub module for component interaction.

## Project Structure

force-app/ │── main/ │ ├── default/ │ │ ├── lwc/ │ │ │ ├── accountSearch/ # Component for searching accounts │ │ │ ├── accountDetails/ # Displays account details and navigation buttons │ │ │ ├── contactDetails/ # Shows related contacts of the selected account │ │ │ ├── pubsub/ # Custom PubSub module for event communication


## Components and Functionality

### 1️⃣ **PubSub Module (pubsub.js)**

Handles event-based communication between components that are not directly related.

### 2️⃣ **Account Search (accountSearch.js)**

- Searches for accounts using the Apex method (`searchAccounts`).
- Publishes the search results using **PubSub**.
- Hides or shows the search section based on navigation events.

### 3️⃣ **Account Details (accountDetails.js)**

- Subscribes to account search results and updates the table.
- Allows users to select an account and navigate to contact details.
- Uses **PubSub** to publish the selected account.

### 4️⃣ **Contact Details (contactDetails.js)**

- Subscribes to the selected account ID and fetches related contacts.
- Displays the contacts in a table format.

## How to Use

1️⃣ **Search for an account** using the search box.  
2️⃣ **Select an account** from the displayed results.  
3️⃣ **Click Next** to view related contacts.  
4️⃣ **Click Back** to return to the account list.  

## Apex Methods Used

- 🔹 **AccountController.cls**: Handles account search using **SOQL** queries.
- 🔹 **ContactController.cls**: Fetches contacts based on the selected account.

## Setup Instructions

1. Deploy the LWC components to Salesforce.
2. Ensure that **AccountController** and **ContactController** Apex classes are deployed.
3. Add the LWC components to a **Lightning page** in App Builder.
4. Test the functionality by searching for accounts and navigating between components.

## Technologies Used

- ✅ **Lightning Web Components (LWC)**
- ✅ **Apex (SOQL Queries, Remote Calls)**
- ✅ **PubSub (Event-Driven Communication)**
- ✅ **Salesforce Platform**
