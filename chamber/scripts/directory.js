const navButton = document.querySelector('#ham-btn');
const navBar = document.querySelector('#nav-bar');
const membersContainer = document.querySelector('#members');
const gridButton = document.querySelector('#grid');
const listButton = document.querySelector('#list');

navButton.addEventListener('click', () => {
  navButton.classList.toggle('show');
  navBar.classList.toggle('show');
});

async function getMembers() {
  const response = await fetch('data/members.json');
  const data = await response.json();
  displayMembers(data.members);
}

function displayMembers(members) {
  membersContainer.innerHTML = '';

  members.forEach((member) => {
    const card = document.createElement('section');
    card.classList.add('member-card');

    const name = document.createElement('h2');
    name.textContent = member.name;

    const image = document.createElement('img');
    image.setAttribute('src', member.image);
    image.setAttribute('alt', `${member.name} logo`);
    image.setAttribute('loading', 'lazy');
    image.setAttribute('width', '300');
    image.setAttribute('height', '200');

    const address = document.createElement('p');
    address.innerHTML = `<strong>Address:</strong> ${member.address}`;

    const phone = document.createElement('p');
    phone.innerHTML = `<strong>Phone:</strong> ${member.phone}`;

    const website = document.createElement('p');
    website.innerHTML = `<strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener noreferrer">${member.website}</a>`;

    const membership = document.createElement('p');
    membership.innerHTML = `<strong>Membership:</strong> ${getMembershipLevel(member.membership)}`;


    card.appendChild(name);
    card.appendChild(image);
    card.appendChild(phone);
    card.appendChild(address);
    card.appendChild(website);
    card.appendChild(membership);

    membersContainer.appendChild(card);
  });
}

function getMembershipLevel(level) {
  if (level === 1) return 'Member';
  if (level === 2) return 'Silver';
  if (level === 3) return 'Gold';
  return 'Member';
}

gridButton.addEventListener('click', () => {
  membersContainer.classList.add('grid');
  membersContainer.classList.remove('list');
});

listButton.addEventListener('click', () => {
  membersContainer.classList.add('list');
  membersContainer.classList.remove('grid');
});

document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

getMembers();