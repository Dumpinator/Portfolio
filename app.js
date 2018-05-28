class Portfolio {

	constructor (selector) {
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
		let content = child.querySelector('.js-body').cloneNode(true)
		child.after(content)
		this.slideDown(content)
	}

	slideDown (element) {
		let height = element.offsetHeight
		element.style.height = '0px'
		element.style.transitionDuration = '.5s'
		element.offsetHeight //force le repeat
		element.style.height = height + 'px'
	}

}

new Portfolio ('#js-portfolio')
