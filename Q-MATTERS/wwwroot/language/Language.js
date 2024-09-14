// Función para obtener las traducciones desde el archivo JSON
async function getTranslation() {
    const response = await fetch('/language/translate2.json');
    const data = await response.json();
    return data.translate;
}

// Función para obtener el idioma seleccionado desde las cookies
const getLangFromCookie = () => {
    const name = 'lang=';
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length);
        }
    }
    return 'esp'; // Por defecto al español
}

// Función para guardar el idioma seleccionado en las cookies
const setLangInCookie = (lang) => {
    document.cookie = `lang=${lang}; path=/;`;
}

// Función para actualizar el contenido de la página según el idioma
async function renderLanguage(selectedLang) {
    const elements = document.querySelectorAll('[lang-attr]');
    const translations = await getTranslation();
    const lang = selectedLang || getLangFromCookie();

    for (const el of elements) {
        const translation = translations.find(t => t.lang_attr === el.getAttribute('lang-attr'));
        if (translation) {
            el.textContent = translation[lang];
        }
    }

    // Actualizar el texto del elemento con el ID 'selectedLanguage'
    const selectedLanguageElement = document.getElementById('selectedLanguage');
    if (selectedLanguageElement) {
        selectedLanguageElement.textContent = lang === 'esp' ? 'Español' : 'English';
    }
}

// Configura el idioma al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    await renderLanguage();
});

// Manejo del cambio de idioma
const handleLanguageChange = (newLang) => {
    setLangInCookie(newLang);
    renderLanguage(newLang);
}

// Asignar eventos a los botones
document.getElementById('btnEspañol').addEventListener('click', () => {
    handleLanguageChange('esp');
});

document.getElementById('btnIngles').addEventListener('click', () => {
    handleLanguageChange('eng');
});


//document.getElementById('lang').addEventListener('change', renderLanguege)

//$(document).ready(function () {
//    $(".header-carousel").on('initialized.owl.carousel', function (event) {
//        initLanguage();
//    });
//});


//// Función para establecer una cookie
//function setCookie(name, value, days) {
//    var expires = "";
//    if (days) {
//        var date = new Date();
//        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
//        expires = "; expires=" + date.toUTCString();
//    }
//    document.cookie = name + "=" + (value || "") + expires + "; path=/";
//}

//// Función para obtener una cookie
//function getCookie(name) {
//    var nameEQ = name + "=";
//    var ca = document.cookie.split(';');
//    for (var i = 0; i < ca.length; i++) {
//        var c = ca[i];
//        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
//        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
//    }
//    return null;
//}

//// Función para cambiar el idioma
//function changeLanguage(language) {
//    setCookie('language', language, 30);

//    // Actualizar el texto del idioma seleccionado en el dropdown
//    var selectedLanguageText = language === 'en' ? 'English' : 'Spanish';
//    document.getElementById('selectedLanguage').textContent = selectedLanguageText;

//    fetch('/language/translations.json')
//        .then(response => {
//            if (!response.ok) {
//                throw new Error('Error en la respuesta: ' + response.statusText);
//            }
//            return response.json();
//        })
//        .then(translationsJSON => {
//            var translations = translationsJSON[language];

//            // Actualiza los textos en el carrusel
//            var carouselItems = document.querySelectorAll('.header-carousel .carousel-caption');
//            carouselItems.forEach(item => {
//                item.querySelector('#carouselDescription').textContent = translations.carousel.description;

//                var contactButton = item.querySelector('#contactButton a');
//                if (contactButton) {
//                    contactButton.textContent = translations.carousel.contact_button;
//                }
//            });

//            // Actualiza los textos en la sección "About"
//            document.getElementById('whoWeAreTitle').textContent = translations.about.who_we_are_title;
//            document.getElementById('whoWeAreDescription').textContent = translations.about.who_we_are_description;
//            document.getElementById('ourReputation').textContent = translations.about.our_reputation;
//            document.getElementById('reputation1').textContent = translations.about.reputation_1;
//            document.getElementById('reputation2').textContent = translations.about.reputation_2;
//            // Actualiza los textos en la sección "Philosophy"
//            document.getElementById('philosophyTitle').textContent = translations.philosophy.title;
//            document.getElementById('philosophyDescription').textContent = translations.philosophy.description;

//            //// Actualiza los textos en la sección "Principle"
//            document.getElementById('principleTitle').textContent = translations.principle.title;
//            document.getElementById('principleDescription').textContent = translations.principle.description;

//            //// Actualiza los textos en la sección "Success"
//            document.getElementById('successTitle').textContent = translations.success.title;
//            document.getElementById('successDescription').textContent = translations.success.description;

//            //// Actualiza los textos en la sección "Services Linkage"
//            document.getElementById('servicesLinkageTitle').textContent = translations.services_linkage.title;
//            document.getElementById('servicesLinkageDescription').textContent = translations.services_linkage.description;

//            //// Actualiza los textos en la sección "Services Inspection"
//            document.getElementById('servicesInspectionTitle').textContent = translations.services_inspection.title;
//            document.getElementById('servicesInspectionDescription').textContent = translations.services_inspection.description;

//            //// Actualiza los textos en la sección "Services Training"
//            document.getElementById('servicesTrainingTitle').textContent = translations.services_training.title;
//            document.getElementById('servicesTrainingDescription').textContent = translations.services_training.description;

//            //// Actualiza los botones
//            document.getElementById('getStartedButton').textContent = translations.buttons.get_started;
//            document.getElementById('getStartedButton2').textContent = translations.buttons.get_started;
//            document.getElementById('getStartedButton3').textContent = translations.buttons.get_started;

//            //// Actualiza los textos en la sección "Contact"
//            document.getElementById('contactHeaderTitle').textContent = translations.contact.header.title;
//            //document.getElementById('contactHeaderTitle2').textContent = translations.contact.header.title;
//            //document.getElementById('contactSection1Title').textContent = translations.contact.section_1.title;
//            //document.getElementById('contactMessage').textContent = translations.contact.message.question;

//            //var form = translations.contact.form;
//            //document.getElementById('formName').placeholder = form.name;
//            //document.getElementById('formEmail').placeholder = form.email;
//            //document.getElementById('formPhone').placeholder = form.phone;
//            //document.getElementById('formProject').placeholder = form.project;
//            //document.getElementById('formSubject').placeholder = form.subject;
//            //document.getElementById('formMessage').placeholder = form.message;
//            //document.getElementById('formSubmitButton').textContent = form.submit_button;

//        })
//        .catch(error => console.error('Error al cargar el archivo JSON:', error));
//}





//// Función para inicializar el idioma basado en la cookie guardada
//function initLanguage() {
//    var savedLanguage = getCookie('language') || 'es'; // Por defecto, español
//    changeLanguage(savedLanguage);

//    // Actualizar el texto del idioma seleccionado en el dropdown
//    var selectedLanguageText = savedLanguage === 'en' ? 'English' : 'Spanish';
//    document.getElementById('selectedLanguage').textContent = selectedLanguageText;
//}

//document.addEventListener('DOMContentLoaded', function () {
//    initLanguage();
//});





//document.getElementById('reputation3').textContent = translations.about.reputation_3;




//// Actualiza los textos en la sección "Inspection Services"
//document.getElementById('inspectionServicesHeaderTitle').textContent = translations.inspection_services.header.title;
//document.getElementById('inspectionServicesSection1Title').textContent = translations.inspection_services.section_1.title;
//document.getElementById('inspectionServicesSection1Supervision').textContent = translations.inspection_services.section_1.supervision;
//document.getElementById('inspectionServicesSection1Report').textContent = translations.inspection_services.section_1.report;
//document.getElementById('inspectionServicesSection1ContactButton').textContent = translations.inspection_services.section_1.contact_button;

//document.getElementById('inspectionServicesSection2Title').textContent = translations.inspection_services.section_2.title;
//document.getElementById('inspectionServicesSection2Support247').textContent = translations.inspection_services.section_2.support_24_7;
//document.getElementById('inspectionServicesSection2EngineeringSpecsFocus').textContent = translations.inspection_services.section_2.engineering_specs_focus;
//document.getElementById('inspectionServicesSection2EngineeringTrainingSupervisors').textContent = translations.inspection_services.section_2.engineering_training_supervisors;
//document.getElementById('inspectionServicesSection2WorkInstructions').textContent = translations.inspection_services.section_2.work_instructions;

//// Actualiza los textos en la sección "Linkage Services"
//document.getElementById('linkageServicesHeaderTitle').textContent = translations.linkage_services.header.title;
//document.getElementById('linkageServicesSection1Title').textContent = translations.linkage_services.section_1.title;
//document.getElementById('linkageServicesSection1EngineersExperienced').textContent = translations.linkage_services.section_1.engineers_experienced;
//document.getElementById('linkageServicesSection1ProvenSuccess').textContent = translations.linkage_services.section_1.proven_success;
//document.getElementById('linkageServicesSection1AppliedEngineering').textContent = translations.linkage_services.section_1.applied_engineering;
//document.getElementById('linkageServicesSection1TechnicalSpecsFocus').textContent = translations.linkage_services.section_1.technical_specs_focus;
//document.getElementById('linkageServicesSection1TechnicalSupport').textContent = translations.linkage_services.section_1.technical_support;
//document.getElementById('linkageServicesSection1ClientNegotiations').textContent = translations.linkage_services.section_1.client_negotiations;
//document.getElementById('linkageServicesSection1ProblemResolution').textContent = translations.linkage_services.section_1.problem_resolution;
//document.getElementById('linkageServicesSection1ContactButton').textContent = translations.linkage_services.section_1.contact_button;





