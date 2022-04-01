# Technical questions

Please answer the following questions in a markdown file called `Answers.md`.

1. How long did you spend on the backend coding test? What would you add to your solution if you had more time? What would've been your architecture choice for this kind of application without our example?

   
    I spent about 3 hours working on back-end. I will add more validation check on Json Input. I would work with date format maybe. 
2. How can you handle post midnight cases to be displayed on the same day and not the next one?
    
    
    I transform JsonInput on LocationPlanningMapper with moment. If end date is before start date, I add a day.
3. How long did you spend on the frontend coding test? What were your biggest difficulties?
    

    About 3 hours too. I had never used ReactJs before. So I take time to read documentation. In my daily work, I use VueJs.

4. How would you track down a performance issue in production? Have you ever had to do this?


    I had an issue with an Hubspot Synchronizer between our API and Hubspot. There was 2 problems. I/O on our database with concurrency and Maximum reached limit to API Hubspot

### Bonus questions

1. How are you feeling about our [game and locations](https://www.eva.gg)?


    I never had the chance to play because there is no location in Rennes. But I have seen some youtube video. I'm looking forward to a new location in Rennes.
2. Are you a gamer? Which games do you play? 

    
    Yes, I play sometime (Mario Kart, Warzone, Fornite) but I'm a casual gamer.
3. Do you know livestreaming? RTMP? 


    No

#### Thanks for your time, we look forward to hearing from you!