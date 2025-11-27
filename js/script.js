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
    
    // Update about section
    $('#about .card-text').text(data.about.summary);
    
    // Update skills
    const skillsContainer = $('#skills .d-flex');
    skillsContainer.empty();
    data.skills.forEach(function(skill) {
      skillsContainer.append('<span class="badge skill">' + skill + '</span>');
    });
    console.log('Skills updated:', data.skills.length);
    
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
    
    // Update experience/resume section
    const resumeContainer = $('#resume .card-text');
    let experienceText = '';
    data.experience.forEach(function(exp, index) {
      experienceText += exp.company + ' (' + exp.period + ')';
      if (index < data.experience.length - 1) {
        experienceText += ', ';
      }
    });
    resumeContainer.text(experienceText);
    
    // Update contact section
    $('#contact .card-text').text(
      'Email: ' + data.personal.email + ' | ' +
      'Phone: ' + data.personal.phone + ' | ' +
      'Skype: ' + data.personal.skype
    );
    
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
