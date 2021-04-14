**How long did you spend on the backend coding test?**

I would say around 3 hours.

**What would you add to your solution if you had more time?**

- Better data modeling, surely not optimal and the most easier way to work with.
- The slots calculation is far too complicated, which make it hard to unit test. A refactoring is needed here.
- Improve the test coverage.

**What would've been your architecture choice for this kind of application without our example?**

- I would have created an API:
  - The files architecture I have created follow a repository pattern. In case we want to properly store/read data somewhere.
  - And have a class defining the API.
- For the registration of locations, this can be done either through the API ideally and/or an internal tool if specific processing is needed.
- The front would call the API using a REST request or GraphQL.

**How can you handle post midnight cases to be displayed on the same day and not the next one?**

During the grouping of the slots, we could group the slots depending of the day's opening hours instead of the day the slot technicaly belongs to. 

**How long did you spend on the frontend coding test?**

Less than one hour.

**What were your biggest difficulties?**

- Deal with the model provided in the json file. I am not sure the current one is the best one for front end use.
- Go towards a component oriented approach. It would need more time to define the components of the app.
- The addition of a state management lib could have help to split up component concerns. 

**How would you track down a performance issue in production? Have you ever had to do this?**

I would use a service helping to troubleshoot performance issues like datadog. Even if I have never used the capability of datadog for that purpose though.

I never had to do that for front ends. But I would be excited to try!

### Bonus questions

**How are you feeling about our game and locations?**

The game orientation is really toward FPS. I suppose because the technology really fit this kind of game. I would be interested if you have other kind of games you would like to release.

There is no locations near my place sadly, but I could privatize a warehouse near am I right? I am interested to see how a setup of the platform is done depending of the place. It must be some interesting complexity here.

**Are you a gamer? Which games do you play?**

I played counter strike (+surf mode) and battlefield like A LOT. But now I play small games most often, like CupHead or Hades for example.

**Do you know livestreaming? RTMP?**

I know what a livestream is and that services exist for multi streaming. But never had to set that in place.
