# Part 9

## exercises 9.1 -

exercise 9.1 = 1hr 30min
exercise 9.2 = 30min
exercise 9.3 = 30min
exercises 9.4, 9.5 = 30min
exercise 9.6 = 40min
(Trying to setup eslint but latter part causes problems with .eslintrc not seeing .tsconfig.json)
Note: managed to fix but not really sure how, possible reloading into folder then back out? or just changing to .eslintrc and not .eslintrc.cjs (module.exports = {})
exercise 9.7 = 40min
exercise 9.8 = 30min (managed to fix eslint error by changing "project": true - as this sets eslint to use the .tsconfig.json that is closest to the source files!)
exercise 9.9 = 30min (had trouble getting cors working as it would error saying it is 'any' value, but seemed to be editor not using the @types/cors straight away ?)
exercise 9.10 = 30min
exercise 9.11 = 20min (still unsure about Omit<Patient, 'ssn'>; type and mapping over the object to remove ssn in the return statement object, as it seems like you can still add an ssn or another key and typescript doenst complain that it doesn't exist in the SensitivePatientDetails object ?)
exercise 9.12 = 50min
exercise 9.13 = 1hr 25min (Tried to use as const object instead of enum for Gender as TotalTypescript suggests enums are bad practice - however I could not validate the incoming string against the Gender object values, so used enum as in the course documentation)
exercise 9.14 = 45min
exercise 9.15 = 45min - (got confused with prop types, at first tried to destructure and put the type interface in directly e.g. parts: CourseParts[] but this doesnt work - need to do a Props interface with parts: CourseParts[] in it instead?)
exercise 9.16 = 50min (got stuck at first with cors for flight-diary: initially thought I needed to set '/api' proxy in vite config but didn't work, instead I installed cors in the supplied backend although not sure if this is the correct approach. Copied the types file from the backend to the frontend: unsure if this is correct approach also)
exercise 9.17 = 40min - (unsure if this is correctly done: I had to change the NewDiaryEntry type to have weather and visibilty as strings, as I could not pass them through axios.post())
exercise 9.18 = 2hr 10min - (added a notification component with Context but found it very difficult to get the typings right; first followed a previous exercise example with useReducer, then changed to useState, but still had trouble with things possibly being null which I wanted to allow: I had to use useStat(null!) - can't remember what exactly the ! operator does with null but it seemed to work; not sure if this is the best approach, also don't know if I'm throwing the errors correctly and if I should be using async in the frontend for useState rather than .then(), so I found this exercise incredibly difficult as I still get thoroughly confused with setting up a Context and hook in the same file / unsure if I'm doing it correctly as it complains about 'Fast refresh only works when a file only exports components...' - don't know if this is a Vite thing although I'm unsure if I had this problem in the previous exercises)
exercise 9.19 = 15min (changing new diary form to use a date field and radio buttons)
exercise 9.20 = 1hr - some trouble with the types of the object, unsure if I should be using try / catch in the get route as with the post route
exercise 9.21 = 50min (some problems trying to get the api working at first, but used useState and useEffect to fetch api and then render using params.id - doesn't differentiate between no data and loading though: ReactQuery probably better for this sort of thing)
exercise 9.22 = 30min (don't know if items are actually checked by the backend correctly, or just via typescript checking; if that is enough?)
exercise 9.23 = 15min
exercise 9.24 = 15min
exercise 9.25 = 1hr 15min
exercise 9.26 = 1hr 30min (quite tricky, unsure if checking correctly and providng good error messages; although server cannot know what type of Entry is intended based on missing information so I think it is good enough)
exercise 9.27 = 2hr 30min (error message / state doesn't clear, or form reset when success)
exercise 9.28 = 45min - setup form UI to switch between entry types

= 22hr 25min

