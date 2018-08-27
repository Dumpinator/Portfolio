//////// GRID PORTFOLIO //////////

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
			this.slideUp(this.activeContent)
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
			this.slideDown(content)
			this.scrollTo(child, offset)
			this.activeContent = content
			this.activeItem = child
		}
	}

	slideDown (element) {
		let height = element.offsetHeight

		element.style.height = '0px'
		element.style.transitionDuration = '.5s'
		element.offsetHeight //force le repeat
		element.style.height = height + 'px'
		window.setTimeout(function () {
			element.style.height = null
		}, 500)
	}

	slideUp (element) {
		let height = element.offsetHeight

		element.style.height = height + 'px'
		element.offsetHeight //force le repeat
		element.style.height = '0px'
		window.setTimeout(function () {
			element.parentNode.removeChild(element)
		}, 500)
	}

	scrollTo (element, offset = 0) {
		window.scrollTo({
			behavior: 'smooth',
			left: 0,
			top: element.offsetTop - offset
		})
	}
}



const project1 = {
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

const createProjectDiv = proj => {
	return `
		<div class="projects js-item ">
			<img src="${proj.src}" alt="" class="project_img">
			<h4 class="project_date">${proj.date}</h4>
			<h2 class="project_name">${proj.name}</h2>
			<div class="project_title">${proj.title}</div>
			<div class="project_tag">
				<ul>
						<li><a target="_blank" href="${proj.generateTag.link}" class="tag tag-bootstrap">${proj.generateTag.name}</a></li>
				</ul>
			</div>
			<div class="project_description js-body">
					<h3>${proj.titleDescription}</h3>
					<p>${proj.paraDescription}</p>
					<div class="project_tag">
							<ul>
									<li><a href="#" class="tag tag-html">${proj.linkLanguage[0]}</a></li>
									<li><a href="#" class="tag tag-css">${proj.linkLanguage[1]}</a></li>
									<li><a href="#" class="tag tag-js">${proj.linkLanguage[2]}</a></li>
							</ul>
					</div>
					<div class="link">
							<a target="_blank" href="${proj.linkDescription}"><i class="fas fa-arrow-alt-circle-right fa-2x"></i></a>
					</div>
			</div>
		</div>
	`
}

const projetGenerator = document.getElementById('js-portfolio')
projetGenerator.innerHTML = createProjectDiv(project1)



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
