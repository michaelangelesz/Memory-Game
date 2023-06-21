# Memory Game
## Milestone Project 1

As a kid, Memory was a favorite game. This game is dedicated to those carefree days of old school board games. As an adult, I have come to love the game of Tarot. Here, I combine the two in a new, modern atmosphere! 

In this project, I use the Rider Waite Smith Tarot Deck to create a memory game that challenges players to match pairs of cards and improve their memory skills. When the user arrives to my game, they are given a certain amount of lives. When they begin flipping the cards, each mismatch takes a life. When the lives count reaches zero, the game ends, and a game-over screen appears with the text "🔮 Better luck next time! 🔮". However, if the user is able to reveal all the matches with the lives provided, a win screen appears with the message "🔮 Good fortune! You win! 🔮". In either case, the user is presented with a button to start a new game.

The wooden background image is a photo of my hardwood floor, and the back-of-card image is a photo of my actual tarot deck pouch, with a snapchat filter. The two sounds are also homemade, the flip is an actual card flip sound I recorded, and the un-flip (mismatch) sound is my voice.

In building this project, I referred to the following resources:

For the cards layout, card flips, and match check:<br>
[Memory Game in Vanilla JavaScript by Marina Ferreira](https://www.freecodecamp.org/news/vanilla-javascript-tutorial-build-a-memory-game-in-30-minutes-e542c4447eae)

I grabbed the Lives counter from here, and also the card flip animation:<br>
[Awesome Vanilla JavaScript Memory Card Game Tutorial by developedbyed](https://youtu.be/-tlb4tv4mC4)

With the Lives counter, a user could already "lose" my game. So I use the same logic and count each time a pair of cards is matched, for a win. After that, it was just a matter of making message divs to display to the user, with the option to restart/ play again.

I also queried my personal [AI Assistant](https://www.macgpt.com/) from time to time. This helped me especially to work out the `count++;` solution, to allow a win. Shouts also for the help in working out the end-of-game message divs, and compiling citations.

## Rider Waite Smith Tarot Deck history and citation:

The Rider Waite Smith Tarot Deck is a classic tarot deck first published in 1909 by US Games Systems, Inc. It was created by Arthur Edward Waite, a British occultist and author, and Pamela Colman Smith, an American artist and illustrator. The deck features 78 cards, each with its own unique symbolism and meaning, and is widely used for divination, meditation, and spiritual guidance.

I acknowledge the creators and publishers of the Rider Waite Smith Tarot Deck for their contribution to the world of tarot and divination, and I use their work with respect, appreciation, and reverence.

- Title: Rider Waite Smith Tarot Deck
- Creator: Arthur Edward Waite (author) and Pamela Colman Smith (artist)
- Publisher: US Games Systems, Inc.
- Year: 1909 (first edition)


## Please see my second version of this project, Memory Albums! I actually think this one is prettier: [Memory Albums](https://michaelangelesz.github.io/Memory-Albums/)
