//////// GRID PORTFOLIO //////////
import { slideUp , slideDown , slideToggle } from './js/toggle.js'
import projects from './js/data.js'

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

const createProjectTemplate = projectType => {

	function generateLi(nb){
		let result = ""
		for (var i = 0; i < nb.length; i++) {
			result += `<li><a target="_blank" href="${projectType.generateTag.link[i] ? projectType.generateTag.link[i] : "#"}" class="tag tag-${projectType.generateTag.cssColor[i]}">${projectType.generateTag.name ? projectType.generateTag.name[i] : "debug"}</a></li>`
			nb[i]
		}
		return result
	}

	return `
		<div class="projects js-item ">
			<img src="${projectType.src}" alt="" class="project_img">
			<h4 class="project_date">${projectType.date}</h4>
			<h2 class="project_name">${projectType.name}</h2>
			<div class="project_title">${projectType.title}</div>
			<div class="project_tag">
				<ul>
					${generateLi( Object.values(projectType.generateTag.name) )}
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
						<a target="_blank" href="${projectType.linkDescription[0]}"><i class="fab fa-github-alt fa-2x"></i></a>
						<a target="_blank" href="${projectType.linkDescription[1]}"><i class="fas fa-arrow-alt-circle-right fa-2x"></i></a>
					</div>
			</div>
		</div>
	`
}

/// injection projects html ///
new Portfolio ('#js-portfolio')
const projectDivContainer = document.getElementById('js-portfolio')
projectDivContainer.innerHTML = projects.map(createProjectTemplate).join("")
new Portfolio ('#js-portfolio')

//////// FRONT ////////

// Typo dynamique
document.addEventListener('DOMContentLoaded', function () {
	// Typed lib
	const section1 = {
		strings: ["Projects", "Learning", "New Techno"],
		typeSpeed: 80,
		loop: true
	}

	const section2 = {
		strings: ["Autodidact", "Geek", "Tech watch"],
		typeSpeed: 80,
		loop: true
	}

	const section3 = {
		strings: ["Contact", "CV", "Social"],
		typeSpeed: 80,
		loop: true
	}

	new Typed(".element1", section1);
	new Typed(".element2", section2);
	new Typed(".element3", section3);
})

//new Portfolio ('#js-portfolio')
