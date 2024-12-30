// Wait for the DOM to be fully loaded

document.addEventListener("DOMContentLoaded", () => {
  //get all the skill progress
  const skillBars = document.querySelectorAll(".skill-progress");
  console.log(skillBars);

  //Function to check if an element  t is viewport
  const isInViewPort = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };
  //Function to animate skill bars
  const animateSkillBars = () => {
    skillBars.forEach((skillBar) => {
      if (isInViewPort(skillBar)) {
        //Get the percentage from data attribute
        const percent = skillBar.getAttribute("data-percent");
        //Set the custom property for CSS animation
        skillBar.style.setProperty("--percent", `${percent}%`);
        //Add animation class
        skillBar.classList.add("animate");
        setTimeout(() => {
          skillBar.style.width = `${percent}%`;
        }, 1000);
      }
    });
  };
  animateSkillBars();
});
