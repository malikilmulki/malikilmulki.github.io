// Load resume data from JSON
$(document).ready(function() {
  console.log('Loading resume data...');
  
  $.getJSON('data/resume.json', function(data) {
    console.log('Resume data loaded successfully:', data);
    
    // Update personal info
    $('.hero-title').text(data.personal.name);
    $('.hero-subtitle').text(data.personal.title + ' | ' + data.personal.location);
    $('.hero-contact').html(
      '📧 ' + data.personal.email + ' | ' +
      '📞 ' + data.personal.phone + ' | ' +
      '💬 Skype: ' + data.personal.skype
    );
    
    // Update profile photo
    if (data.personal.photo) {
      $('.hero-img').css('background-image', 'url(' + data.personal.photo + ')');
    }
    
    // Update about section
    $('#about .card-text').text(data.about.summary);
    
    // Update skills
    const skillsContainer = $('#skills .card-body');
    // Remove existing skills but keep the title
    skillsContainer.find('.skill-category').remove();
    
    // Add each skill category
    $.each(data.skills, function(category, skills) {
      const skillHtml = `
        <div class="skill-category mb-2">
          <strong>${category}:</strong> ${skills}
        </div>
      `;
      skillsContainer.append(skillHtml);
    });
    console.log('Skills updated');
    
    // Update projects dynamically
    const projectsContainer = $('#projects .row');
    console.log('Projects container found:', projectsContainer.length);
    console.log('Number of projects:', data.projects.length);
    
    projectsContainer.empty();
    
    // Determine column size based on number of projects
    const colSize = data.projects.length <= 2 ? 'col-md-6' : 'col-md-4';
    console.log('Using column size:', colSize);
    
    data.projects.forEach(function(project, index) {
      console.log('Adding project:', project.title);
      const projectHtml = `
        <div class="${colSize} mb-3">
          <div class="project-card">
            <div class="project-img" style="background-image: url('${project.image}')"></div>
            <h5>${project.title}</h5>
            <p>${project.description}</p>
          </div>
        </div>
      `;
      projectsContainer.append(projectHtml);
    });
    
    console.log('Projects updated successfully');
    
    // Update experience/resume section with detailed timeline
    const resumeContainer = $('#resume .card-body');
    resumeContainer.find('.experience-timeline').remove();
    
    let experienceHtml = '<div class="experience-timeline">';
    data.experience.forEach(function(exp, index) {
      experienceHtml += `
        <div class="experience-item">
          <div class="experience-header">
            <div class="experience-title">
              <i class="fas fa-circle experience-bullet"></i>
              <h5>${exp.position}</h5>
            </div>
            <span class="experience-period">${exp.period}</span>
          </div>
          <div class="experience-company">${exp.company}</div>
          <div class="experience-tech"><strong>Technologies:</strong> ${exp.technologies}</div>
          <ul class="experience-responsibilities">
            ${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
          </ul>
        </div>
      `;
    });
    experienceHtml += '</div>';
    resumeContainer.append(experienceHtml);
    console.log('Experience updated');
    
    // Update contact section with links and icons
    const contactContainer = $('#contact .card-body');
    contactContainer.find('.contact-info').remove();
    
    const contactHtml = `
      <div class="contact-info">
        <p class="mb-4">Feel free to reach out to me through any of the following channels:</p>
        <div class="row g-3">
          <div class="col-md-6">
            <a href="mailto:${data.personal.email}" class="contact-link">
              <i class="fas fa-envelope"></i>
              <div class="contact-details">
                <strong>Email</strong>
                <span>${data.personal.email}</span>
              </div>
            </a>
          </div>
          <div class="col-md-6">
            <a href="tel:+${data.personal.whatsapp}" class="contact-link">
              <i class="fas fa-phone"></i>
              <div class="contact-details">
                <strong>Phone</strong>
                <span>${data.personal.phone}</span>
              </div>
            </a>
          </div>
          <div class="col-md-6">
            <a href="https://wa.me/${data.personal.whatsapp}" target="_blank" class="contact-link">
              <i class="fab fa-whatsapp"></i>
              <div class="contact-details">
                <strong>WhatsApp</strong>
                <span>Message me</span>
              </div>
            </a>
          </div>
          <div class="col-md-6">
            <a href="skype:${data.personal.skype}?chat" class="contact-link">
              <i class="fab fa-skype"></i>
              <div class="contact-details">
                <strong>Skype</strong>
                <span>${data.personal.skype}</span>
              </div>
            </a>
          </div>
          <div class="col-md-6">
            <a href="${data.personal.linkedin}" target="_blank" class="contact-link">
              <i class="fab fa-linkedin"></i>
              <div class="contact-details">
                <strong>LinkedIn</strong>
                <span>Connect with me</span>
              </div>
            </a>
          </div>
          <div class="col-md-6">
            <a href="${data.personal.github}" target="_blank" class="contact-link">
              <i class="fab fa-github"></i>
              <div class="contact-details">
                <strong>GitHub</strong>
                <span>View my code</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    `;
    contactContainer.append(contactHtml);
    
    console.log('All sections updated successfully');
  }).fail(function(jqxhr, textStatus, error) {
    console.error('Failed to load resume data');
    console.error('Status:', textStatus);
    console.error('Error:', error);
    console.error('Response:', jqxhr.responseText);
    
    // Show error message in projects section
    $('#projects .row').html('<div class="col-12"><div class="alert alert-danger">Failed to load projects. Check console for details.</div></div>');
  });
});
