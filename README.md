## Problem Statement

India’s street food scene is vibrant, loved, and chaotic. But behind every delicious plate of chaat or Vada Pav, there’s a hidden struggle, raw material sourcing. Most street vendors have to manage quality, pricing, and availability on their own. There’s no structured system, no trusted platform, and definitely no easy access to affordable supplies.
The challenge we’re addressing is:

> **“In India, street food vendors have a problem with bringing in raw materials from trusted and cheap vendors.”**
> 

---

## Our Understanding of the Problem

Street food vendors form the backbone of India’s informal food economy. Despite the demand they cater to, vendors constantly struggle with access to fresh, affordable, and reliable raw materials — especially vegetables.
This problem is driven by:

- **Middlemen inflating prices** between farms and vendors.
- **Lack of cold storage**, which leads to spoilage and limits consistent availability of perishable items like onions and tomatoes.
- **Unstructured supply chains**, forcing vendors to rely on inconsistent local markets daily.

---

## Our Solution

Street food vendors face two major problems: inflated prices due to middlemen, and significant wastage of perishable produce due to lack of proper cold storage. These issues make it hard for vendors to maintain consistent quality and profit margins.

Our solution is a **city-wide platform** that connects food cart vendors directly to **farm-sourced vegetables**, which are stored in partnered cold storage warehouses. This eliminates the middlemen, ensures fresh produce, and helps vendors get a **fixed, affordable price** that is lower than local market rates.

Vendors can place orders in two simple ways:

- **Through our web application**: They select their nearest warehouse, vendor type, required vegetables, preferred pickup slot (available 4 times a day), and confirm using their phone number.
- **Via a callback request**: Warehouse vendors call back to confirm the order and schedule a pickup time that works for the vendor.

We operate on a **pickup-only model** initially to reduce delivery costs, allowing us to keep prices low and minimize risk. Each warehouse is **restocked regularly** based on demand to avoid shortages. We also ensure all vegetables are **fresh and properly stored**, preserving their shelf life.

In short, we make it easy for street vendors to get quality produce at the right price, without the daily stress of negotiating or worrying about spoilage.

---

## Key Features

**1. Direct Farm-to-Warehouse Supply Chain**
We eliminate middlemen by sourcing vegetables directly from partnered farm groups and storing them in citywide cold-storage-enabled warehouses — ensuring cost-effective and fresh produce for vendors.

**2. Vendor-Centric Ordering System**
Street vendors can place orders easily through our web app or via phone calls. They can select their nearest warehouse, choose pickup slots, and receive order confirmations via phone — making the system accessible and flexible.

**3. Affordable, Fresh, and Scheduled Pickups**
Vendors get fixed, below-market pricing and can choose from four daily pickup slots. The integration of cold storage ensures minimal wastage and fresh produce at every collection point.

---

## Tech Stack

- GitHub
- Vercel
- Bolt
- HTML CSS
- Node JS
- Google AI Studio

---

## System Workflow(For Vendors)

**Step-by-step flow of the working prototype:**

- **Select the Nearest Warehouse**
    
    Vendors begin by choosing the most convenient warehouse location from the available options across the city.
    
- **Choose Vendor Type**
    
    They specify what type of vendor they are (e.g., fruit cart, chaat vendor, juice stall, etc.) to help us understand their category and suggest commonly needed items.
    
- **Select Food Items**
    
    From the curated list of fresh produce, vendors can select the raw materials they require.
    
- **View Order Summary & Choose Pickup Time**
    
    Vendors can review their complete order and select a preferred pickup slot from four available time windows throughout the day.
    
- **Confirm with Phone Number**
    
    A phone number is provided to confirm the order and receive updates or a callback if needed.
    
- **Pickup Order**
    
    Vendors visit the selected warehouse at their chosen time and collect their fresh, pre-packed supplies.
    

---

## System Workflow(For Store Employees)

**Step-by-step flow of the working prototype:**

- **Login to Dashboard**
    
    Managers log in using their assigned ID and password to access the dashboard.
    
- **Restock Inventory**
    
    In the “Restock” section, managers can view items running low, add quantities needed, and send restock requests to partner farms.
    
- **View & Complete Orders**
    
    The “Today’s Orders” section displays all confirmed vendor orders. Managers can click “Complete Order” once the vendor picks up their items.
    
- **Book Orders via Call**
    
    In the “Book an Order” section, managers can manually add order details for vendors who placed their orders via phone, including item selection, pickup time, and contact number.
    

---

## Innovation & Uniqueness

- **What makes the project stand out?**
We’re creating a direct farm-to-vendor network tailored specifically for street food cart vendors — a group often overlooked in tech-enabled supply chains. Our model emphasizes affordability, freshness, and convenience with hyperlocal pickup points.
- **Why is it better than other solutions?**
Unlike large-scale delivery models that increase costs or platforms that focus on end consumers, our solution is built for bulk, low-margin orders and removes middlemen. The flexible pickup system keeps operations lean and cost-effective.
- **Any clever twist or integration?**
The dual access approach — via a web app or phone call — ensures inclusivity for non-tech-savvy users. On the backend, a dedicated warehouse dashboard streamlines restocking and phone-based orders, integrating traditional practices with tech-enabled workflows.

---
# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
