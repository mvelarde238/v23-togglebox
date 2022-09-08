<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>V23 Togglebox</title>
	<link rel="stylesheet" href="../v23-togglebox.css">
	<script src="../v23-togglebox.js"></script>
	<script src="add-buttons.js"></script>
	<link rel="stylesheet" href="styles.css">
</head>
<body class="text-color-2">
	<div class="container">
	<?php 
	$toggleboxes = array(
		array(
			'id' => 'test1',
			'title' => 'Default: tab; se convierte en accordion debajo de 768px:',
			'addButtons' => true,
		),
		array(
			'id' => 'test2',
			'title' => 'Empieza como accordion y se convierte en tab debajo de 768px:',
			'initialTemplate' => 'accordion',
			'breakpoints' => '768|tab'
		),
		array(
			'id' => 'test3',
			'title' => 'Se envían las opciones por js',
			'js-options' => '{initialTemplate:"accordion",breakpoints:{768:{template:"tab"}}}'
		),
		array(
			'id' => 'test4',
			'title' => 'Los atributos data sobre escriben las opciones enviadas por js',
			'initialTemplate' => 'accordion',
			'breakpoints' => '768|tab',
			'js-options' => '{initialTemplate:"tab",breakpoints:{768:{template:"accordion"}}}'
		),
		array(
			'id' => 'test5',
			'title' => 'tab en desktop y mobile:',
			'breakpoints' => '768|tab'
		),
		array(
			'id' => 'test6',
			'title' => 'accordion en desktop y mobile:',
			'initialTemplate' => 'accordion'
		)
	);

	$count = 1;

	foreach ($toggleboxes as $t) { 
		$id = $t['id'];
		$initialTemplate = (isset($t['initialTemplate'])) ? 'data-template="'.$t['initialTemplate'].'"' : '';
		$breakpoints = (isset($t['breakpoints'])) ? 'data-breakpoints="'.$t['breakpoints'].'"' : '';

		$jsOptions = (isset($t['js-options'])) ? $t['js-options']: '{}';

		$wrapper = '<div id="'.$id.'" class="v23-togglebox tab-style1"';
		if($initialTemplate) $wrapper .= ' '.$initialTemplate;
		if($breakpoints) $wrapper .= ' '.$breakpoints;
		$wrapper .= '>';
		?>
		<section id="section-<?=$id?>" class="section">
			<h4 class="separador"><?php echo $t['title'] ?></h4>
			<code>
				<?php echo htmlentities($wrapper.'...</div>'); ?>
				<?php if($jsOptions != '{}') echo '<br><br>const options = ' . htmlentities($jsOptions); ?>
			</code>
			<?php echo $wrapper ?>
				<div class="v23-togglebox__nav">
					<a class="v23-togglebox__btn" data-boxid="#box<?php echo $count; ?>"><p>Primer Item</p></a>
					<a class="v23-togglebox__btn" data-boxid="#box<?php echo ($count+1); ?>"><p><i>Segundo Item</i></p></a>
					<a class="v23-togglebox__btn" data-boxid="#box<?php echo ($count+2); ?>"><p>Tercer Item</p></a>
				</div>
				<div class="v23-togglebox__items">
					<div id="box<?php echo $count; ?>" class="v23-togglebox__item">
						<div class="componente">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis explicabo expedita tempore a voluptatum fugiat nemo! Dolores debitis architecto ratione sit, molestias reiciendis corrupti rem. Quasi assumenda quidem, officiis consectetur?</div>
					</div>
					<div id="box<?php echo ($count+1); ?>" class="v23-togglebox__item">
						<div class="componente">Dolores debitis architecto ratione sit, molestias reiciendis corrupti rem. Quasi assumenda quidem, officiis consectetur? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis explicabo expedita tempore a voluptatum fugiat nemo!</div>
					</div>
					<div id="box<?php echo ($count+2); ?>" class="v23-togglebox__item">
						<div class="componente">Reiciendis corrupti rem. Quasi assumenda quidem, officiis consectetur? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis explicabo expedita tempore a voluptatum fugiat nemo! Dolores debitis architecto ratione sit, molestias ret.</div>
					</div>
				</div>
			</div>
			<?php if(isset($t['addButtons']) && $t['addButtons']) : ?>
				<button class="btn add-item">+ ADD ITEM</button>
				<button class="btn remove-first-item">⮾ REMOVE FIRST</button>
				<button class="btn remove-last-item">⮾ REMOVE LAST</button>
			<?php endif; ?>
		</section>
		<script> 
			var id = '<?php echo $id; ?>',
				togglebox = document.getElementById( id ),
				options = <?php echo $jsOptions; ?>,
				tb = V23_ToggleBox.create( togglebox, options );
			<?php if(isset($t['addButtons']) && $t['addButtons']) echo 'addButtons(id,tb);' ?>
		</script>
		<?php
		$count = ($count + 3);
	}
	?>
	</div>



	<script>
	// asi se inicializa 1 en específico:
	// var el = document.getElementById('elementID');
	// V23_ToggleBox.create( el, {});
	
	// asi se inicializan todos al mismo tiempo:
	// var instances = V23_ToggleBox.init();
	// console.log(instances);
	</script>
</body>
</html>