# Marvel Strike Force Orb Simulator
A web app for simulating the prize drops when opening a loot box, called orbs, in the mobile game Marvel Strike Force.

## About
As required by law (or maybe just by Apple/Google app requirements), the game provides the percent chance of each prize in an orb. For instance, a Mega Orb has a **15%** chance to drop an uncommon prize and an **85%** chance to drop a common prize. However, the uncommon prize is a box of prizes from which you only get one of the prizes. So in the 15% prize box, there is a **1.01%** chance to get a certain prize, i.e. 1.01% of 15% chance to get a specific prize your looking for. As far as I can tell, the percentages reported in game are an approximation since they do not add up to an even 100%. Therefore, my simulator is as close as I could get to the in-game probabilities.

## Features
- Simulations for Mega, Premium, and Ultimus Orbs
- Running tally of orbs opened
- Running tally of prize amounts
- Prize history chestbox

## To Do List
- More Statistics
	- ~~Breakdown by orb types~~
	- Biggest character drop total
- Continuous opening until achieving requested result
- Add Red Star orb with no boosts
- ~~Clear history option~~

## Will Never Add
- Specialty orbs
	- Offer Orbs
	- Non-Character Items
	- Elite Red Star orbs (maybe...)
	- Orbs with changing probabilities due to boosts.
