// ----- HEADER SCRIPTS -----

const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {            
            if (entry.isIntersecting) {
                document.querySelectorAll('.header-item').forEach(item => {
                    item.classList.remove('in-view');

                    let section_id = entry.target.id;

                    const header_item = document.querySelector(`[target-section="${section_id}"]`) || document.querySelector(`[target-section2="${section_id}"]`);
                    if (header_item) {
                        header_item.classList.add('in-view');
                    }
                })

                
            }
        })
    }, {
        threshold: 0.8
    });

    sections.forEach(sec => observer.observe(sec));

    // ----- PROJECT CARDS SCRIPTS -----
    const project_cards = document.querySelectorAll('.project-card');

    function openURL(url) {
        window.open(url, "_blank");
    }

    project_cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            let content = this.nextElementSibling;

            content.style.maxHeight = content.scrollHeight + "px";
            card.classList.add('is-active');
            card.classList.remove('not-selected');

            project_cards.forEach(othercards => {
                if (othercards !== card) {
                    let otherContent = othercards.nextElementSibling;
                    otherContent.style.maxHeight = null;

                    othercards.classList.remove('is-active');
                    othercards.classList.add('not-selected');
                }
            });
        });
    });

    project_cards.forEach(card => {
        card.addEventListener('mouseleave', function () {
            let content = this.nextElementSibling;
            
            content.style.maxHeight = null;
            card.classList.remove('is-active');

            const activeCard = Array.from(project_cards).find(c => c.classList.contains('is-active'))

            if (activeCard) {
                activeCard.classList.remove('not-selected');
                project_cards.forEach(c => {
                    if (c !== activeCard) {
                        c.classList.add('not-selected')
                    }
                });               
            } else {
                project_cards.forEach(c => {
                    c.classList.remove('not-selected');
                });
            }

        });
    });


    // ----- TIMELINE SCRIPTS -----
    const timeline = document.querySelector('.timeline');
    const timeline_line = document.querySelector('.timeline-line');
    const timeline_item = document.querySelectorAll('.timeline-item');

    function handleScroll() {
        const timeline_rect = timeline.getBoundingClientRect();
        const window_height = window.innerHeight;

        const trigger = window_height / 1.5;
        const distance = trigger - timeline_rect.top;
        const max_height = timeline.offsetHeight;

        let new_height = 0;

        if (distance > 0) {
            new_height = distance;
        }

        if (new_height > max_height) {
            new_height = max_height;
        }

        timeline_line.style.height = `${new_height}px`;

        timeline_item.forEach(item => {
            const dot = item.querySelector('.timeline-dot');
            const line_bottom = timeline_line.getBoundingClientRect().bottom - 1;

            if (line_bottom > dot.getBoundingClientRect().top + 1) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        })
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    timeline_item.forEach(item => {
        item.addEventListener('mouseenter', () => {
            timeline_item.forEach(otheritems => {
                if (otheritems !== item) {
                    otheritems.classList.add('not-selected');
                }
            });
            timeline_line.style.opacity = '0.5';
        });
    });

    timeline_item.forEach(item => {
        item.addEventListener('mouseleave', () => {
            timeline_item.forEach(otheritem => {
                if (otheritem !== item) {
                    otheritem.classList.remove('not-selected');
                }
            });
            timeline_line.style.opacity = '1';
        });
    });




    // ----- COPY ICON -----

    async function copyAnimation(icon) {
        icon.classList.add('copied');

        let text_to_copy = icon.previousElementSibling.textContent;

        try {
            await navigator.clipboard.writeText(text_to_copy);
        } catch (err) {
            console.error("Failed to copy text to clipboard: ", error);
            alert("Falha ao copiar texto.");
        }

        setTimeout(() => {
            icon.classList.remove('copied');
        }, 2000);
    }
