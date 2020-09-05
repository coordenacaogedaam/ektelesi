import { DragDropContext } from 'react-beautiful-dnd'
import { useState, useCallback, useEffect } from 'react'
import { useFormikContext, useField } from 'formik'
import { ErrorMessage } from '../Messages'
import List from './DroppableList'
import { listUpdateHandler, moveInsideList, moveBetweenLists } from './utils'

export function DragAndDrop({ options, meta, helper }) {
  const [lists, setLists] = useState(options.lists)
  const { groups } = options
  const { values } = useFormikContext()

  // Updates lists according to previous form data
  useEffect(() => {
    setLists(prevLists =>
      listUpdateHandler(prevLists, groups, { college: values.college, semester: values.semester })
    )
  }, [groups, values.college, values.semester])

  // Updates selected values when the selected list changes (via onDragEnd)
  useEffect(() => {
    helper.setValue(lists.selected.groupIds)
  }, [lists.selected.groupIds]) // adding helper causes infinite loop

  const [draggableOrigin, setDraggableOrigin] = useState(null)

  const onDragStart = start => {
    setDraggableOrigin(start.source.droppableId)
  }

  const onDragEnd = useCallback(result => {
    setDraggableOrigin(null)

    const { destination, source } = result
    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    setLists(prevLists => {
      const startList = prevLists[source.droppableId]
      const finishList = prevLists[destination.droppableId]

      if (startList === finishList) {
        const newList = moveInsideList(startList, source.index, destination.index)
        return {
          ...prevLists,
          [newList.id]: newList
        }
      }

      const [newStartList, newFinishList] = moveBetweenLists(
        startList,
        finishList,
        source.index,
        destination.index
      )

      return {
        ...prevLists,
        [newStartList.id]: newStartList,
        [newFinishList.id]: newFinishList
      }
    })
  }, [])

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      {Object.values(lists).map(list => (
        <List
          key={list.id}
          list={list}
          groups={groups}
          isDropDisabled={
            list.id === 'selected' && list.groupIds.length >= 2 && draggableOrigin !== 'selected'
          }
        />
      ))}
      <div className="ml-px w-full h-12 md:h-6">
        {meta.error && <ErrorMessage>{meta.error}</ErrorMessage>}
      </div>
    </DragDropContext>
  )
}
