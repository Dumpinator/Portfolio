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
				e.preventDefault()
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

//////// FRONT ////////

window.sr = ScrollReveal({ reset: false });
sr.reveal('.js-message-1', { origin: 'left',
										duration: 2000 });

sr.reveal('.js-message-2', { origin: 'left',
										duration: 2000 });

window.setTimeout(removeSecret, 2000)


function removeSecret() {
	let monSecret = document.querySelectorAll("p.secret")
	for (let item of monSecret) {
		item.classList.remove('secret')
	}
	let monText = document.querySelectorAll("div.text")
	for (let item of monText) {
		item.classList.add('secret')
	}
}




new Portfolio ('#js-portfolio')
