var quiz = [
  { "id": 0,
    "question": "IS YOUR BOSS A MAN?",
    "choices": [
      { "button": "Yes",
        "text": "Of course. According to a 2013 Gallup poll, 54% of Americans have a male boss, versus 30% with a female one. Actually, 35% of Americans would rather work for a man, while 40% have no preference either way.",
        "points": 1,
        "next": 1 },
      { "button": "No",
        "text": "Watch out. Female bosses ￼might not help you get ahead. In 2012, MIT studied U.S. bank branches where half the managers were women. They were just as unlikely to promote underlings.",
        "points": 1,
        "next": 4 }
    ]
  },
  { "id": 1,
    "question": "DOES HE HAVE A WIFE?",
    "choices": [
      { "button": "Yes",
        "text": "",
        "points": 0,
        "next": 2 },
      { "button": "No",
        "text": "",
        "points": 0,
        "next": 3 }
    ]
  },
  { "id": 2,
    "question": "DOES HIS WIFE WORK?",
    "choices": [
      { "button": "Yes",
        "text": "Great! In a UNC Kenan Flagler Business School study, male managers married to working women were more likely to recommend female candidates over males for new positions.",
        "points": 1 },
      { "button": "No",
        "text": "Bad news: The same research showed married men with stay-at-home wives viewed female colleagues unfavorably and had a tendency to pass them over for promotions.",
        "points": -1 }
    ]
  },
  { "id": 3,
    "question": "DOES HE HAVE A DAUGHTER?",
    "choices": [
      { "button": "Yes",
        "text": "Excellent! If a male CEO has a first child who’s a girl, a female employee’s wages will rise by 1.1%. Male employees see a much smaller rise, according to a 2012 issue of Administrative Science Quarterly.",
        "points": 1 },
      { "button": "No",
        "text": "Eek. Based on the same study, when CEOs have a son, all employees’ wages drop. Fortunately, it’s less than half a percent.",
        "points": -1 }
    ]
  },
  { "id": 4,
    "question": "ARE YOU BLOND?",
    "choices": [
      { "button": "Yes",
        "text": "U. of Queensland researchers found blondes make 7% more",
        "points": 1 },
      { "button": "No",
        "text": "Could you be blond?",
        "points": -1 }
    ]
  },
  { "id": 5,
    "question": "DO YOU FLIRT AT WORK?",
    "choices": [
      { "button": "Yes",
        "text": "Go for it. In 2012, Berkeley’s Haas School of Business found that women could flirt their way into higher prices when selling cars to men. In 2009, former Sec. of State Madeline Albright told Bill Maher that she flirted with foreign dignitaries so they’d concur.",
        "points": 1 },
      { "button": "No",
        "text": "Safety first; flirting can backfire. A 2013 Academy of Management brief said that even though big law firms encouraged strategic flirtation, the women who tried it were looked down upon, considered stupid, and mistreated.",
        "points": 0 }
    ]
  },
  { "id": 6,
    "question": "DO YOU DRESS UP FOR WORK?",
    "choices": [
      { "button": "Yes",
        "text": "￼Well done. According to Proctor & Gamble-funded psychology research conducted at Harvard U., people think women wearing makeup look more competent and professional than those who don’t.",
        "points": 1 },
      { "button": "No",
        "text": "This may be ideal. In a study titled “Intolerance of Sexy Peers,” a McMaster U. researcher discovered women were put off by other women who looked too fancy. 85% preferred a thin blond woman in khakis over the same woman in a short skirt and tall boots.",
        "points": -1 }
    ]
  },
  { "id": 7,
    "question": "HOW’S YOUR WEIGHT?",
    "choices": [
      { "button": "I'm good",
        "text": "Nice! Many studies have proven a woman’s weight has a significant effect on her earnings potential. The Journal of Applied Psychology reported in 2010 that even very thin women are punished when they gain a little.",
        "points": 1 },
      { "button": "I could lose a few",
        "text": "Uh oh. There’s a sad scientific correlation: When a woman’s BMI increases, her income decreases. Her spouse’s does, too. The effect is most profound on younger women without established careers.",
        "points": -1 }
    ]
  },
  { "id": 8,
    "question": "￼DO YOU HAVE GOOD POSTURE?",
    "choices": [
      { "button": "Yes",
        "text": "A Harvard Business School study says you’ll look more powerful.",
        "points": 1 },
      { "button": "No",
        "text": "Stand up straight.",
        "points": -1 }
    ]
  }
];

function loaded () {

  // quiz intro
  $("body").append(_.template($("#introTemplate").html()));

  // add questions
  var template = $("#quizTemplate").html();
  _.each(quiz, function(q, i) {
    $("body").append(_.template(template, {"q": q, "i": i}));
  });

  // add outro
  $("body").append(_.template($("#outroTemplate").html()));
  $("#outro").attr("data-slideindex", quiz.length);

  // when start button is clicked...
  $("#start").click(function(e) {
    // it shows the first question and hides the start button
    $('.slide.question[data-slideindex="0"]').show();
    $(e.target).hide();

    // scroll to bottom of page (to reveal first question)
    $('html, body').animate({
       scrollTop: $(document).height()-$(window).height()},
       500,
       "swing"
    );
  })

  $("button.choice").click(function(e) {
    var button = $(e.target);
    var slide = button.closest(".question");

    // show points and text
    slide.find("button").removeClass("active");
    button.addClass("active");
    slide.find("p").text(button.data("text"));

    // update point total
    var answers = $(".choice.active");
    var pointTotal = answers.toArray().reduce(function(a,b) {
      return a + $(b).data("points");
    }, 0);
    $("#point-total").text(pointTotal);
    $("#point-total-text").text(pointText(pointTotal));

    // progressive reveal (show next slide)
    var nextSlide = button.data("nextslide") ? button.data("nextslide") : slide.data("slideindex")+1;
    $('.slide[data-slideindex="'+nextSlide+'"]').show();

    // scroll to bottom of page (to reveal next question)
    $('html, body').animate({
       scrollTop: $(document).height()-$(window).height()},
       500,
       "swing"
    );
  });

}

// just maps points to conclusion descriptions
function pointText(points) {
  if(points>5) {
    return "You get a raise!";
  } else if (points >= 0) {
    return "Tread carefully. Oh, and maybe get some highlights.";
  } else {
    return "Have you thought about quitting your job?";
  }
}
