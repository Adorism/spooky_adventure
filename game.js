const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'It is October 29th and you have no idea what you will dress as for Halloween. You wake up early, hoping that something will come to you. You do your best thinking while walking the dog. You find your dog, "Chance", and put her leash on. As you head out the door, you notice something strange at the far end of the porch. What do you do?',
    options: [
      {
        text: 'Investigate',
        setState: { blueGoo: true },
        nextText: 2
      },
      {
        text: 'Keep moving',
        nextText: 6
      }
    ]
  },
  {
    id: 2,
    text: 'To your surprise, there is a clown costume, neatly folded, at the far end of your porch. When you look closer, you notice that there is a note tucked under the colorful wig. Chance is whimpering. She must really want to get going with her morning walk. But, you want to read the note. So you pat her quickly and reassure her you two will soon be on your way. The note is addressed to you. It reads: "I found the perfect costume for you" but the weird thing is no one signed it. Who could have left you this costume? And how did they know you love CLOWNS?',
    options: [
      {
        text: 'It must have been your best friend. ',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3
      },
      {
        text: 'Some creep! Toss it in the trash',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 7
      }
    ]
  },
  {
    id: 3,
    text: 'You pick the costume up and run to the front hall to stash it in your backpack. Your best friend Wendy is always so thoughtful. Of course she would figure out just the right costume for you. Just remember to thank her at school right away. You quickly walk the dog. No need for thinking now. You can just enjoy the changing leaves and the crisp autumn air. When you get home you have another decision to make, though. You heard a rumor that some of the kids in your grade were going to wear their costumes to school today, since Halloween falls on a weekend. Sounds tempting. What are you going to do?',
    options: [
      {
        text: 'Wear the costume!',
        nextText: 4
      },
      {
        text: 'Better wait and see...',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: "Yes! Of course. Anyone in their right mind would wear this awesome clown costume to school. You put it on right after breakfast because it would not be fun to wash maple syrup out of your wig. When you look in the mirror, you smile. Because you look great. You can't stop smiling. What do you do?",
    options: [
      {
        text: 'Head out the door for school',
        nextText: 5
      },
      {
        text: "PANIC. You literally can't stop smiling",
        nextText: 8
      },

    ]
  },
  {
    id: 5,
    text: "As you make your way to your locker, you notice that there are some other kids in costumes. Strangely, most of them are also dressed as clowns. Wendy approaches you wearing the biggest smile. She's dressed as a clown, too. 'Thanks for the costume' she shouts. You're puzzled. You tell her you thought she had left the costume for you. And that's when things got weird. Both of your smiles get bigger. You try to scream, but you can't. Now you're both creepy clowns!",
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: "It's a good thing you left that creepy costume alone. When you got to school that day, the police were there. They had to gather up all the kids who showed to school wearing clown costumes and surgically remove the wigs. Some creep had put sweat activated glue in them.",
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 7,
    text: 'You pick up the costume gingerly, with your fingertips. It has a strange chemical smell. You toss it in the trash barrel and take a nice long walk with Chance',
    options: [
      {
        text: 'Go to School',
        nextText: 6
      }
    ]
  },
  {
    id: 8,
    text: "This costume must be cursed! You do your best to turn your smile into a frown or even just a straight face. But no matter how hard you try, that creepy clown smile is stuck on your face. When you try to pull the sides of your smile down, it actually seems as though your smile gets bigger. You shout for help. Your dog yelps in fright and runs to the backdoor. Now you're a creepy clown. ",
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },

]

startGame()