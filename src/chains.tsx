import { engine, GltfContainer, Transform, pointerEventsSystem, InputAction, UiText} from '@dcl/sdk/ecs'
import {acala} from './parachains/acala'
import {moonbeam} from './parachains/moonbeam'
  import { Color4 } from '@dcl/sdk/math'
  import ReactEcs, { Button, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
  
  let selected = ""

export function parachainz() {

  let items: { [key: string]: any } = {};

    // Custom hover texts for each item
    const hoverTexts: string[] = [
        "Acala",
        "Moonbeam",
        "Astar",
        // ... add texts for all 30 items
    ];
    
    // Custom functions for each item's pointer down event
    const pointerDownFunctions: Array<() => void> = [
        () => { acala(); selected = "Acala", setupUi(); },
        () => { moonbeam(), selected = "Moonbeam", setupUi(); },
        () => { console.log("Action for Item 3"); },
        // ... add functions for all 30 items
    ];
    
    for (let i = 1; i <= 3; i++) {
        console.log(`Creating ITEM ${i}`);
      
        // Store each entity in the items object with a dynamic key
        items[`item${i}`] = engine.addEntity();
      
        GltfContainer.create(items[`item${i}`], {
            src: `models/item${i}.gltf`,
        });
    
        pointerEventsSystem.onPointerDown({
                entity: items[`item${i}`],
                opts: { 
                    button: InputAction.IA_POINTER, 
                    hoverText: hoverTexts[i - 1],  // Retrieve the custom hoverText using the current index
                    maxDistance:100,
                    showFeedback: true 
                },
            },
            pointerDownFunctions[i - 1]  // Retrieve the custom function using the current index
        );
    
        // Calculate x and y positions for a 6x5 grid with doubled spacing
        let x = ((i - 1) % 6) * 2.5;   // Modulo operation gives column position, then multiply by 2 for spacing
        let y = (Math.floor((i - 1) / 6)) * 3;  // Division gives row position, then multiply by 2 for spacing
    
        // Using the correct entity reference for Transform.create
        Transform.create(items[`item${i}`], {
            position: { x: x + 2, y: y+1, z: 10 }  // Place items on the x-y plane
        });
    }
    
}


export function setupUi() {
    ReactEcsRenderer.setUiRenderer(uiComponent)
  }
  
  const uiComponent = () => (
    <UiEntity
      uiTransform={{
        width: 400,
        height: 100,
        margin: '16px 0 8px 270px',
        padding: 4,
      }}
      uiBackground={{ color: Color4.create(0.5, 0.8, 0.1, 0.6) }}
    >
      <UiEntity
        uiTransform={{
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
        uiBackground={{ color: Color4.fromHexString("#70ac76ff") }}
      >
        <UiEntity
          uiTransform={{
            width: '100%',
            height: 50,
            margin: '8px 0'
          }}
        uiText={{ value: selected, fontSize: 18 }}
        />
 
      
 <Button
          uiTransform={{ width: 100, height: 70, margin: 8 }}
          value='Buy NFT'
          variant='primary'
          fontSize={14}
          onMouseDown={() => {
            console.log('Spawn cube clicked !')
          }}
        />
       </UiEntity>
    </UiEntity>
  )
