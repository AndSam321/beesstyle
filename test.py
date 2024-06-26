import requests
import json
import time

API_KEY = 'AIzaSyBOhoeCP9ZZgil7oFxRvO4PX2zFHuqGgHw'
PLACE_ID = 'ChIJP8i8PSRvyYcREXXh7JgS67Y'
FIELDS = 'reviews'

def fetch_reviews(place_id, api_key, fields, next_page_token=None):
    url = f"https://maps.googleapis.com/maps/api/place/details/json?place_id={place_id}&fields={fields}&key={api_key}"
    if next_page_token:
        url += f"&pagetoken={next_page_token}"
    
    response = requests.get(url)
    return response.json()

def get_all_reviews(place_id, api_key, fields):
    all_reviews = []
    next_page_token = None

    while True:
        data = fetch_reviews(place_id, api_key, fields, next_page_token)
        reviews = data.get('result', {}).get('reviews', [])
        all_reviews.extend(reviews)
        
        next_page_token = data.get('next_page_token')
        if not next_page_token:
            break
        
        # Wait for a short period before using the next_page_token
        time.sleep(2)
    
    return all_reviews

# Fetch all reviews
all_reviews = get_all_reviews(PLACE_ID, API_KEY, FIELDS)

# Save the reviews to a JSON file
with open('reviews.json', 'w') as file:
    json.dump(all_reviews, file, indent=4)

print("Reviews have been saved to reviews.json")
