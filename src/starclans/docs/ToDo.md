### ToDo:
- Add cache busting
- skeleton loading while the user waits on the page
- research 1 tech at a time workflow
- scan for conflict, roster gladiator, resolve workflow
- show api processing on relevant gladiator cards
- make gladiator cards clickable instead of ... dropdown option
- alt gladiator card that is a 'row' / horizontal view appropriate for a mobile list


#### Next Battle Steps:
- add button for loading some gladiators from state
- add button for loading some enemies from state
- update projected power for each side / projected chance of winning
- add button to resolve conflict and randomly roll actual values and pick a winning side


Eventually we'll need:
Enable user to swap gladiators into their lineup and hit save
View previously completed battles
Click on gladiator cards and go to a profile view that shows previous battles and more stats


## Design Brainstorming
- just use certain times during the day that events play out?
- if we use generic enemies (orc, bot, barbarian, etc) we probably want a way to group them / assign a category
- enemies should be part of the object defining conflict assignment parameters
- can I use a simple series of choices in my prompt to add significant randomization?
"Consider the following persona axes when coming up with the core inspiration and tone of the gladiator:
A - color, emotion, Lineage, purpose, technology  
B - poetic, grim, altruistic, competitive, chaotic, lawful  
C - sneaky, tanky, glass cannon, strong, wildcard, leader"

If we end up with a design where multiple battles can be done at different times, we want to avoid a situation where a players feels they need to:
    - figure out if a gladiator will be available after a battle for another battle
    - login in some tight window to assign that gladiator to another battle after their first battle ends

## Technical Brainstorming
- do i need to breakup ClientGameState so that different api endpoints fetch different chunks of it?
    - maybe its not realistic to be fetching the entire state each ping?

- need to be able to run gameEngine 'to next stop time' so I can resolve things as they happen, rather than the entire chunk of time at once
    - can I pull out some interface for 'resolvesAt' date that I can always run the engine to?

Consider using EventBridge, Lambda, and SQS in order to resolve many battles at a specific time
- this could also be used for 'multi-step' battles if I eventually want to go that route

Other things that can be resolved 'whenever' (like gladiator stamina recovery) can be done on a 'dumb' schedule + whenver the player pings the API (we would also conduct this update before resolving a battle)

Client should pass some playerId/clanId to api
Api should fetch clan object
Api should be able to find all battles and resolve each individually, but will require fetching each clan

    