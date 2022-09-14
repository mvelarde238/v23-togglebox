function addButtons(id, tooglebox) {
    var section = document.getElementById( 'section-'+id ),
        addItem = section.getElementsByClassName('add-item')[0],
        removeFirstItem = section.getElementsByClassName('remove-first-item')[0],
        removeLastItem = section.getElementsByClassName('remove-last-item')[0];

    (function (clousered_tb) {
        addItem.addEventListener('click', event => {
            event.preventDefault();
            var id = "id" + Math.random().toString(16).slice(2);
            clousered_tb.addItem({
                id: id,
                btn: { content: `<p>New Tab: ${id}</p>` },
                box: { content: `<div class="componente">(id=${id}) Lorem ipsum dolor sit amet consectetur...</div>` },
                afterAddItem: function (newBtn, newBox) {
                    console.log(newBtn);
                },
                setActive: true
            });
        });

        removeFirstItem.addEventListener('click', event => {
            event.preventDefault();
            clousered_tb.removeItem({
                index: 0,
                afterRemoveItem: function (deletedItem) {
                    console.log(deletedItem);
                }
            });
        });

        removeLastItem.addEventListener('click', event => {
            event.preventDefault();
            clousered_tb.removeItem({
                index: clousered_tb.items.length - 1,
                afterRemoveItem: function (deletedItem) {
                    console.log(deletedItem);
                }
            });
        });
    })(tooglebox);
}