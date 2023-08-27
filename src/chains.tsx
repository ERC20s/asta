import { engine, GltfContainer, Transform, pointerEventsSystem, InputAction, ColliderLayer} from '@dcl/sdk/ecs'
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
        "Parallel",
        "clover",
        "efinity",
        "composable",
        "centrifuge",
        "hydradx",
        "interlay",
        "nodle",
        "equilibrium",
        "phala",
        "unique",
        "litentry",
        "polkadex",
        "origintrail",
        "bifrost",
        "coinversation",
        "totem",
        "darwinium",
        "parathread2055",
        "integree",
        "kilt",
        "kylin",
        "aventus",
        "watr",
        "oak",
        "bitgreen",
        "crust",
        "ajuna",
        "zeitgeist",
        "frequency",
        "omni",
        "pendulum",
        "bittensor",
        "subsocial",
        "aleph",
        "manta",
        "hashed",
        "t3rn",
        "moonsama",
    ];
    
    // Custom functions for each item's pointer down event
    const pointerDownFunctions: Array<() => void> = [
        () => { acala(); selected = "Acala", setupUi(); },
        () => { moonbeam(), selected = "Moonbeam", setupUi(); },
        () => { console.log("Action for Item 2"), selected = "Astar", setupUi(); },
        () => { console.log("Action for Item 3"), selected = "Parallel", setupUi(); },
        () => { console.log("Action for Item not selected"); },
        () => { console.log("Action for Item 5"); },
        () => { console.log("Action for Item 6"); },
        () => { console.log("Action for Item 7"); },
        () => { console.log("Action for Item 8"); },
        () => { console.log("Action for Item 9"); },
        () => { console.log("Action for Item 10"); },
        () => { console.log("Action for Item 11"); },
        () => { console.log("Action for Item 12"); },
        () => { console.log("Action for Item 13"); },
        () => { console.log("Action for Item 14"); },
        () => { console.log("Action for Item 15"); },
        () => { console.log("Action for Item 16"); },
        () => { console.log("Action for Item 17"); },
        () => { console.log("Action for Item 18"); },
        () => { console.log("Action for Item 19"); },
        () => { console.log("Action for Item 20"); },
        () => { console.log("Action for Item 21"); },
        () => { console.log("Action for Item 22"); },
        () => { console.log("Action for Item 23"); },
        () => { console.log("Action for Item 24"); },
        () => { console.log("Action for Item 25"); },
        () => { console.log("Action for Item 26"); },
        () => { console.log("Action for Item 27"); },
        () => { console.log("Action for Item 28"); },
        () => { console.log("Action for Item 29"); },
        () => { console.log("Action for Item 30"); },
        () => { console.log("Action for Item 31"); },
        () => { console.log("Action for Item 32"); },
        () => { console.log("Action for Item 33"); },
        () => { console.log("Action for Item 34"); },
        () => { console.log("Action for Item 35"); },
        () => { console.log("Action for Item 36"); },
        () => { console.log("Action for Item 37"); },
        () => { console.log("Action for Item 38"); },
        () => { console.log("Action for Item 39"); },
        () => { console.log("Action for Item 40"); },
        () => { console.log("Action for Item 41"); },
        () => { console.log("Action for Item 42"); },
    ];
    
    for (let i = 1; i <= 42; i++) {
        console.log(`Creating ITEM ${i}`);
      
        // Store each entity in the items object with a dynamic key
        items[`item${i}`] = engine.addEntity();
      
        GltfContainer.create(items[`item${i}`], {
            src: `models/${i}.glb`,
            visibleMeshesCollisionMask: ColliderLayer.CL_POINTER,
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
