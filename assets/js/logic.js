
const STAR_COLOR = '#fff';
const STAR_SIZE = 3;
const STAR_MIN_SCALE = 0.2;
const OVERFLOW_THRESHOLD = 50;
const STAR_COUNT = (window.innerWidth + window.innerHeight) / 8;

const canvas = document.querySelector('canvas'),
	context = canvas.getContext('2d');

let scale = 1, // device pixel ratio
	width,
	height;

let stars = [];
let animationActive = false;
let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.008 };

generate();
resize();
step();

window.onresize = resize;
window.onscroll = onScroll;

function generate() {
	for (let i = 0; i < STAR_COUNT; i++) {
		stars.push({
			x: 0,
			y: 0,
			z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE)
		});
	}
}

function placeStar(star) {
	star.x = Math.random() * width;
	star.y = Math.random() * height;
}

function recycleStar(star) {
	let direction = 'z';

	let vx = Math.abs(velocity.x),
		vy = Math.abs(velocity.y);

	if (vx > 1 || vy > 1) {
		let axis;

		if (vx > vy) {
			axis = Math.random() < vx / (vx + vy) ? 'h' : 'v';
		} else {
			axis = Math.random() < vy / (vx + vy) ? 'v' : 'h';
		}

		if (axis === 'h') {
			direction = velocity.x > 0 ? 'l' : 'r';
		} else {
			direction = velocity.y > 0 ? 't' : 'b';
		}
	}

	star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);

	if (direction === 'z') {
		star.z = 0.1;
		star.x = Math.random() * width;
		star.y = Math.random() * height;
	} else if (direction === 'l') {
		star.x = -OVERFLOW_THRESHOLD;
		star.y = height * Math.random();
	} else if (direction === 'r') {
		star.x = width + OVERFLOW_THRESHOLD;
		star.y = height * Math.random();
	} else if (direction === 't') {
		star.x = width * Math.random();
		star.y = -OVERFLOW_THRESHOLD;
	} else if (direction === 'b') {
		star.x = width * Math.random();
		star.y = height + OVERFLOW_THRESHOLD;
	}
}

function resize() {
	scale = window.devicePixelRatio || 1;

	const animationSection = document.getElementById('animation-section');
	width = animationSection.clientWidth * scale;
	height = animationSection.clientHeight * scale;

	canvas.width = width;
	canvas.height = height;

	stars.forEach(placeStar);
}

function step() {
	if (!animationActive) return;

	context.clearRect(0, 0, width, height);

	update();
	render();

	requestAnimationFrame(step);
}

function update() {
	velocity.tx *= 0.96;
	velocity.ty *= 0.96;

	velocity.x += (velocity.tx - velocity.x) * 0.8;
	velocity.y += (velocity.ty - velocity.y) * 0.8;

	stars.forEach((star) => {
		star.x += velocity.x * star.z;
		star.y += velocity.y * star.z;

		star.x += (star.x - width / 2) * velocity.z * star.z;
		star.y += (star.y - height / 2) * velocity.z * star.z;
		star.z += velocity.z;

		// recycle when out of bounds
		if (star.x < -OVERFLOW_THRESHOLD || star.x > width + OVERFLOW_THRESHOLD || star.y < -OVERFLOW_THRESHOLD || star.y > height + OVERFLOW_THRESHOLD) {
			recycleStar(star);
		}
	});
}

function render() {
	stars.forEach((star) => {
		context.beginPath();
		context.lineCap = 'round';
		context.lineWidth = STAR_SIZE * star.z * scale;
		context.globalAlpha = 0.5 + 0.5 * Math.random();
		context.strokeStyle = STAR_COLOR;

		context.beginPath();
		context.moveTo(star.x, star.y);

		var tailX = velocity.x * 2,
			tailY = velocity.y * 2;

		// stroke() won't work on an invisible line
		if (Math.abs(tailX) < 0.1) tailX = 0.5;
		if (Math.abs(tailY) < 0.1) tailY = 0.5;

		context.lineTo(star.x + tailX, star.y + tailY);

		context.stroke();
	});
}

function onScroll() {
	if (!animationActive) return;

	const scrollY = window.scrollY || document.documentElement.scrollTop;
	velocity.ty = (scrollY - pointerY) * 0.1;
	pointerY = scrollY;
}

let pointerY = window.scrollY || document.documentElement.scrollTop;

// Intersection Observer to trigger animation
const observer = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			animationActive = true;
			step();
		} else {
			animationActive = false;
		}
	});
});

observer.observe(document.querySelector('section'));

ScrollReveal({
    reset:false,
    distance: '60px',
    duration:2500,
    delay:400
    });
    
    ScrollReveal().reveal('.abt',{delay:400,origin:'bottom'});
    ScrollReveal().reveal('.h1conbox',{delay:100,origin:'bottom',mobile:false});
    ScrollReveal().reveal('.teamimg',{delay:100,origin:'bottom',mobile:false});
    ScrollReveal().reveal('.gall-article',{delay:100,origin:'bottom'});
    ScrollReveal().reveal('.h1conbox2',{delay:200,origin:'bottom'});
    ScrollReveal().reveal('.card-container',{delay:300,origin:'bottom'});
    ScrollReveal().reveal('.team-text',{delay:100,origin:'bottom'});
    ScrollReveal().reveal('.media-icons i',{delay:300,origin:'bottom',interval:80});

const hamburger = document.querySelector(".hamburg");
const navMenu = document.querySelector(".navMenu");
hamburger.addEventListener("click", () => {
	hamburger.classList.toggle("active");
	navMenu.classList.toggle("active");
})

document.querySelectorAll(".navLink").forEach(n => n.addEventListener("click", () =>{
	hamburger.classList.remove("active");
	navMenu.classList.remove("active");
}))
   
