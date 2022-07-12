import { createStore } from 'vuex' 

export default createStore({
    state: {
        emotion:"",
        objective1: {
            firstTimeGreeting:{
                sentence1:"Hi I'm your companion, your safe place or just to listen whatever you feel free to tell me. what would you like to call me?",
                sentence2:"Ok, I'm your  …(name)….."
            },
            goalSetting:{
                sentence1:"How would you like to be different as a result of our daily talkingt? Or how would you like your life to be different?",
                sentence2:"Put your “Goals” at the top there.",
                sentence3:"That's a very good goal. If you were…......, what might you be doing differently?",
                sentence4:"Okay. That's a good one."
            }
        },
        objective2: {
            moodCheck:{
                sentence1:"How have you been feeling this day?",
                sentence2:"So, tell me a little bit about your mood."
            },
            askForUpdate:{
                sentence1:"How's your day going?",
                sentence2:"Did that work?",
                sentence3:"Okay"
            },
            reviewTheHomework:{
                sentence1:"So yesterday we talked about ..(word cloud) … how it's going?",
                sentence2:"Did that work?",
                sentence3:"Good. All right, so what do you want to do for tomorrow?"
            },
            identifyIssuesOrGoalsForTheSession: {
                sentence1:"All right. So is that something you would like to talk to, or is that something you think you can get yourself to do?",
                sentence2:"Okay. So, what’s going to be different this time, then?",
            }
        },
        objective3: {
            selfAwareness:{
                depend:["depression"],
                sentence1:{
                    topic: "Why this topic is important?",
                    canPass: true
                },
                sentence2:{
                    topic: "Does this question ask us to evaluate something?",
                    canPass: false
                },
                sentence3:{
                    topic: "Do I have any evidence/proof of this?",
                    canPass: false
                },
                sentence4:{
                    topic: "Is it helpful to think about everything that could go wrong?",
                    canPass: false
                },
                sentence5:{
                    topic: "Is it helpful to think like this?",
                    canPass: false
                },
                sentence6:{
                    topic: "How might somebody else see the situation?",
                    canPass: false
                },
                sentence7:{
                    topic: "How many times has the worst-case scenario actually happened?",
                    canPass: false
                },
                sentence8:{
                    topic: "How likely is it that this will actually happen?",
                    canPass: false
                },
                sentence9:{
                    topic: "Is there another way of looking at it?",
                    canPass: false
                },
            },
            resilience:{
                depend:["depression"],
                sentence1:{
                    topic: "What's one thing you do every day because you really want to do it?",
                    canPass: false
                },
                sentence2:{
                    topic: "What are some of the difficulties you run into in keeping up?",
                    canPass: true
                },
                sentence3:{
                    topic: "Can you think of sometimes in the past few weeks when that has happened?",
                    canPass: false
                },
                sentence4:{
                    topic: "So a few things kept you going. It sounds like you are committed to your goal and you want to keep it in your life.",
                    canPass: false
                },
                sentence5:{
                    topic: "We might be able to figure out how you can done it works in the areas. Can you imagine in the form of picture or the character of your life if we write down what you do when you run into difficulties with your important think to do. Can you descript?",
                    canPass: false
                },
                sentence6:{
                    topic: "If there something difficult to your way again, what is the way that your imagine or character as you mention will action in the role?",
                    canPass: false
                },
                sentence7:{
                    topic: "Being resilient doesn't mean you'll be happy about what you are facing. It just means you are still standing at the end of the day.",
                    canPass: false
                },
            },
            problemSolving:{
                depend:["anxiety"],
                sentence1:{
                    topic: "What problem is bothering you?",
                    canPass: true
                },
                sentence2:{
                    topic: "What were your thought?",
                    canPass: false
                },
                sentence3:{
                    topic: "How did you feel?",
                    canPass: false
                },
                sentence4:{
                    topic: "How did your react?",
                    canPass: false
                },
                sentence5:{
                    topic: "What was the outcome?",
                    canPass: false
                },
                sentence6:{
                    topic: "What's keeping this problem as a problem? What could you do to target that part of the problem?",
                    canPass: false
                },
                sentence7:{
                    topic: "Can you think of anyways that you could make this problem not be a problem any more?",
                    canPass: false
                },
                sentence8:{
                    topic: "What were the advantage of this solution?",
                    canPass: false
                },
                sentence9:{
                    topic: "And what were the disadvantage?",
                    canPass: false
                },
                sentence10:{
                    topic: "What would be some of the worst ways of solving a problem like this? And the best?",
                    canPass: false
                },
            },
            motivationInterview:{
                depend:["anxiety", "relax"],
                sentence1:{
                    topic: "When did you first notice of this issue?",
                    canPass: false
                },
                sentence2:{
                    topic: "In what ways do you think other people have been affected by this issue?",
                    canPass: false
                },
                sentence3:{
                    topic: "What worries you about this issue?",
                    canPass: false
                },
                sentence4:{
                    topic: "What would be the most important benefit of improving your way of reponse to?",
                    canPass: true
                },
                sentence5:{
                    topic: "How has this problem stopped you from moving forward, from doing what's most important in your life?",
                    canPass: false
                },
                sentence6:{
                    topic: "Do you think it's possible to improve?",
                    canPass: false
                },
                sentence7:{
                    topic: "What might stand in your way of improve?",
                    canPass: false
                },
                sentence8:{
                    topic: "How would you like to proceed from here?",
                    canPass: false
                },
                sentence9:{
                    topic: "What is the first thing you can to by now?",
                    canPass: false
                },
            },
        },
        objective4:{
            summary:{
                sentence1:"All right. Well, it's a pretty good idea, then how could you summarize what's the key of today conversation?",
                sentence2:"How would you like your life to be different or coming closer with your goal?",
                sentence3:"What will the first thing you will do in tommorrow?"
            }
        }
    }
});
