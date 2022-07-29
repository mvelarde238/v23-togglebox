<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>V23 Togglebox</title>
	<link rel="stylesheet" href="styles.css">
	<script src="../v23-togglebox.js"></script>
</head>
<body class="text-color-2">
	<?php 
	$toggleboxes = array(
		array(
			'title' => 'Default (tab en desktop y accordion en mobile):'
		),
		array(
			'title' => 'accordion en desktop y tab en mobile:',
			'moviltemplate' => 'tab',
			'desktoptemplate' => 'accordion',
		),
		array(
			'title' => 'data accordion en desktop y tab en mobile, pero en options js está tab en desktop y accordion en mobile:',
			'id' => 'elementID',
			'moviltemplate' => 'tab',
			'desktoptemplate' => 'accordion',
		),
		array(
			'title' => 'tab en desktop y mobile:',
			'moviltemplate' => 'tab',
			'desktoptemplate' => 'tab',
		),
		array(
			'title' => 'accordion en desktop y mobile:',
			'moviltemplate' => 'accordion',
			'desktoptemplate' => 'accordion',
		)
	);

	$count = 1;

	foreach ($toggleboxes as $t) { 
		$mobileTemplate = (isset($t['moviltemplate'])) ? 'data-moviltemplate="'.$t['moviltemplate'].'"' : '';
		$desktoptemplate = (isset($t['desktoptemplate'])) ? 'data-desktoptemplate="'.$t['desktoptemplate'].'"' : '';
		$id = (isset($t['id'])) ? 'id="'.$t['id'].'"' : '';
		?>
		<h4 style="background-color: yellow; padding: 15px"><?php echo $t['title'] ?></h4>
		<div <?php echo $id ?> class="v23-togglebox tab-style1" <?php echo $mobileTemplate.' '.$desktoptemplate ?>>
			<div class="v23-togglebox__nav">
				<a class="v23-togglebox__btn" data-boxid="#box<?php echo $count; ?>">Primer Item</a>
				<a class="v23-togglebox__btn" data-boxid="#box<?php echo ($count+1); ?>">Segundo Item</a>
				<a class="v23-togglebox__btn" data-boxid="#box<?php echo ($count+2); ?>">Tercer Item</a>
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
		<?php
		$count = ($count + 3);
	}
	?>
	<script>
	// asi se inicializa 1 en específico:
	var el = document.getElementById('elementID');
	V23_ToggleBox.create( el, {
		desktopTemplate: 'tab',
		movilTemplate: 'accordion'
	});
	
	// asi se inicializan todos al mismo tiempo:
	var instances = V23_ToggleBox.init();
	console.log(instances);
	</script>
</body>
</html>