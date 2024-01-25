function loco(){
    gsap.registerPlugin(ScrollTrigger);
  
  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
  
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);
  
  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });
  
  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  
  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
  }
  loco()


// page text animation

gsap.from(".text",{
  y:80,
  duration:2,
  stagger:2,
  delay:1.1,
  scrollTrigger:{
    trigger:'.text',
    scroller:"#main",
    scrub:2
  }
})
gsap.from(".smal-text-p2",{
  y:50,
  // duration:2,
  stagger:.25,
  scrollTrigger:{
    trigger:".smal-text-p2",
    scroller:"#main",
    scrub:3
  }
})


// image animation center pic

let tl1 = gsap.timeline()

tl1.from(".pic>img",{
  x : -50,
  stagger:.20,
  scrollTrigger:{
    trigger:".pic>img",
    scroller:"#main",
    // markers:true,
    start:"30% 50%",
    end:"30% 40%",
    scrub:2
  }
})
tl1.from(".pic>img",{
  x : 10,
  y:-15,
  stagger:.20,
  scrollTrigger:{
    trigger:".pic>img",
    scroller:"#main",
    // markers:true,
    start:"50% 90%",
    end:"50% 70%",
    scrub:2
  }
})
tl1.from(".pic",{
  y:70,
  x:-10,
  scale:1.2,
  stagger:.20,
  scrollTrigger:{
    trigger:".pic>img",
    scroller:"#main",
    // markers:true,
    start:"70% 90%",
    end:"70% 70%",
    scrub:2
  }
})




