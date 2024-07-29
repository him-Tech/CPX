$(document).ready(function () {
  gsap.registerPlugin(ScrollTrigger);

  //get stats in array to process one by one
  let stats = $(".statsBannerCard__statistic").toArray();

  //recursive function
  function countOne(stats) {
    if (stats.length < 1) {
      //when all stats done exit
      return;
    }
    let stat = stats.shift(); //remove first

    //make the card visible
    $(stat).css({
      visibility: "visible",
    });

    let count = $(stat),
      zero = {
        val: 0,
      },
      num = count.data("number"),
      split = (num + "").split("."), // to cover for instances of decimals
      decimals = split.length > 1 ? split[1].length : 0;

    if (typeof num == "number") {
      gsap.to(zero, {
        val: num,
        duration: 2,
        scrollTrigger: {
          trigger: stat,
          start: "top 92%",
          onEnter: function () {
            gsap.to(zero, {
              val: num,
              duration: 2,
              onUpdate: function () {
                let numText = zero.val.toFixed(decimals);
                numText = numText.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                count.text(numText);
              },
              onComplete: function () {
                countOne(stats);
              },
            });
          },
        },
      });
    } else {
      count.text(num);
      countOne(stats);
    }
  }

  //initiate
  countOne(stats);
});
