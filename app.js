//import { slideUp , slideDown , slideToggle } from "./js/toggle.js"
//////// GRID PORTFOLIO //////////

function slideUp (element, duration = 500) {
	return new Promise(function (resolve, reject) {
		element.style.height = element.offsetHeight + 'px'
		element.style.transitionProperty = `height, margin, padding`
		element.style.transitionDuration = duration + 'ms'
		element.offsetHeight // eslint-disable-line no-unused-expressions
		element.style.overflow = 'hidden'
		element.style.height = 0
		element.style.paddingTop = 0
		element.style.paddingBottom = 0
		element.style.marginTop = 0
		element.style.marginBottom = 0
		window.setTimeout(function () {
			element.style.display = 'none'
			element.style.removeProperty('height')
			element.style.removeProperty('padding-top')
			element.style.removeProperty('padding-bottom')
			element.style.removeProperty('margin-top')
			element.style.removeProperty('margin-bottom')
			element.style.removeProperty('overflow')
			element.style.removeProperty('transition-duration')
			element.style.removeProperty('transition-property')
			resolve(false)
		}, duration)
	})
}

function slideDown (element, duration = 500) {
	return new Promise(function (resolve, reject) {
		element.style.removeProperty('display')
		let display = window.getComputedStyle(element).display
		if (display === 'none') display = 'block'
		element.style.display = display
		let height = element.offsetHeight
		element.style.overflow = 'hidden'
		element.style.height = 0
		element.style.paddingTop = 0
		element.style.paddingBottom = 0
		element.style.marginTop = 0
		element.style.marginBottom = 0
		element.offsetHeight // eslint-disable-line no-unused-expressions
		element.style.transitionProperty = `height, margin, padding`
		element.style.transitionDuration = duration + 'ms'
		element.style.height = height + 'px'
		element.style.removeProperty('padding-top')
		element.style.removeProperty('padding-bottom')
		element.style.removeProperty('margin-top')
		element.style.removeProperty('margin-bottom')
		window.setTimeout(function () {
			element.style.removeProperty('height')
			element.style.removeProperty('overflow')
			element.style.removeProperty('transition-duration')
			element.style.removeProperty('transition-property')
		}, duration)
	})
}

function slideToggle (element, duration = 500) {
	if (window.getComputedStyle(element).display === 'none') {
		return this.slideDown(element, duration)
	} else {
		return this.slideUp(element, duration)
	}
}

class Portfolio {
	constructor (selector) {
		this.activeContent = null
		this.activeItem = null
		this.container = document.querySelector(selector)
		if (this.container === null) {
			throw new Error(`L'élément ${selector} n'existe pas !`)
		}
		this.children = Array.prototype.slice.call(this.container.querySelectorAll('.js-item'))
		this.children.forEach((child) => {
			child.addEventListener('click', (e) => {
				this.show(child)
			})
		})
	}

 	show (child) {
		let offset = 0

		if (this.activeContent !== null) {
			slideUp(this.activeContent, 300)
			if (this.activeContent.offsetTop < child.offsetTop) {
				offset = this.activeContent.offsetHeight
			}
		}
		if (this.activeItem === child) {
			this.activeContent = null
			this.activeItem = null
		} else {
			let content = child.querySelector('.js-body').cloneNode(true)

			child.after(content)
			slideDown(content, 300)
			scrollTo(child, 300, offset) //remettre offset
			this.activeContent = content
			this.activeItem = child
		}
	}
}

const projects = [
	{
		src: 'img/p1.jpg',
		date: '2016',
		name: 'Becoast',
		title: 'One Page',
		generateTag: {
			link: 'https://getbootstrap.com',
			name: 'Bootstrap' },
		titleDescription: 'Landing Page pour Becoast',
		paraDescription: `Site internet réaliser pour le lancement du MVP pour le concept d'application de Becoast, un One Page responsive
			 et efficace qui permettait d'avoir un CTA pour une carte météo dynamique.`,
		linkLanguage: ['HTML','CSS','JS'],
		linkDescription: 'https://becoast.fr'
	}
	/*
	,
	{
		src: 'img/p1.jpg',
		date: '2018',
		name: 'TOTO',
		title: 'One Page2',
		generateTag: {
			link: 'https://getbootstrap.com',
			name: 'Bootstrap' },
		titleDescription: 'Landing Page pour Becoast',
		paraDescription: `Site internet réaliser pour le lancement du MVP pour le concept d'application de Becoast, un One Page responsive
			 et efficace qui permettait d'avoir un CTA pour une carte météo dynamique.`,
		linkLanguage: ['HTML','CSS','JS'],
		linkDescription: 'https://becoast.fr'
	}
	*/
]

const createProjectTemplate = projectType => {
	return `
		<div class="projects js-item ">
			<img src="${projectType.src}" alt="" class="project_img">
			<h4 class="project_date">${projectType.date}</h4>
			<h2 class="project_name">${projectType.name}</h2>
			<div class="project_title">${projectType.title}</div>
			<div class="project_tag">
				<ul>
						<li><a target="_blank" href="${projectType.generateTag.link}" class="tag tag-bootstrap">${projectType.generateTag.name}</a></li>
				</ul>
			</div>
			<div class="project_description js-body">
					<h3>${projectType.titleDescription}</h3>
					<p>${projectType.paraDescription}</p>
					<div class="project_tag">
							<ul>
									<li><a href="#" class="tag tag-${projectType.linkLanguage[0].toLowerCase()}">${projectType.linkLanguage[0]}</a></li>
									<li><a href="#" class="tag tag-${projectType.linkLanguage[1].toLowerCase()}">${projectType.linkLanguage[1]}</a></li>
									<li><a href="#" class="tag tag-${projectType.linkLanguage[2].toLowerCase()}">${projectType.linkLanguage[2]}</a></li>
							</ul>
					</div>
					<div class="link">
							<a target="_blank" href="${projectType.linkDescription}"><i class="fas fa-arrow-alt-circle-right fa-2x"></i></a>
					</div>
			</div>
		</div>
	`
}
/// injection projects html ///
const projectDivContainer = document.getElementById('js-portfolio')
projectDivContainer.innerHTML = projects.map(createProjectTemplate).join("")


//////// FRONT ////////

window.sr = ScrollReveal({ reset: true });

function animCallback (el) {
		el.classList.add("disable")
		let toto = el.nextElementSibling
		toto.classList.remove("disable")
}
function resetCallback (el) {
	el.classList.remove("disable")
	let toto = el.nextElementSibling
	toto.classList.add("disable")
}
sr.reveal('.js-message-1', { origin: 'left',
														duration: 1900,
														afterReveal: animCallback,
													 	beforeReset: resetCallback });

new Portfolio ('#js-portfolio')
