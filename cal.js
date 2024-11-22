document.addEventListener('DOMContentLoaded', () => {
    const slots = document.querySelectorAll('.day-slot');
    const modal = document.getElementById('eventModal');
    const eventNameInput = document.getElementById('eventName');
    const saveButton = document.getElementById('saveEvent');
    const cancelButton = document.getElementById('cancelEvent');
    let selectedSlot = null;

    // Abrir o modal ao clicar no slot vazio
    slots.forEach(slot => {
        slot.addEventListener('click', () => {
            if (!slot.classList.contains('event')) {
                selectedSlot = slot;
                modal.classList.remove('hidden');
            }
        });
    });

    // Salvar o evento
    saveButton.addEventListener('click', () => {
        const eventName = eventNameInput.value.trim();
        if (eventName && selectedSlot) {
            // Adicionar texto e estilização de evento
            selectedSlot.textContent = eventName;
            selectedSlot.classList.add('event');

            // Criar botão de exclusão
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-event');
            deleteButton.textContent = 'x';

            selectedSlot.appendChild(deleteButton);
            closeModal();
        }
    });

    // Cancelar a criação do evento
    cancelButton.addEventListener('click', closeModal);

    // Deletar eventos usando delegação de eventos
    document.querySelector('.calendar').addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-event')) {
            const slot = e.target.parentElement;
            deleteEvent(slot);
        }
    });

    // Função para fechar o modal
    function closeModal() {
        modal.classList.add('hidden');
        eventNameInput.value = '';
        selectedSlot = null;
    }

    // Função para deletar eventos
    function deleteEvent(slot) {
        slot.textContent = ''; // Remove o texto do evento
        slot.classList.remove('event'); // Remove estilização de evento
    }
});
