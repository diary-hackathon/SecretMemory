"use client"

import {
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon
} from "@heroicons/react/24/solid"
import { useRouter } from "next/navigation"

import {
  Card,
  Chip,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Typography
} from "./MaterialUI"

import { createClient } from "@/utils/supabase/client"

export function Sidebar() {
  const router = useRouter()
  const handleLogout = async () => {
    const supabase = createClient()
    const error = await supabase.auth.signOut()
    if (error) {
      console.error(error)
    }
    router.refresh()
  }
  const listItems = [
    {
      name: "Notifications",
      icon: InboxIcon,
      suffix: (
        <Chip
          value="14"
          size="sm"
          variant="ghost"
          color="blue-gray"
          className="rounded-full"
        />
      )
    },
    { name: "My page", icon: UserCircleIcon },
    { name: "Settings", icon: Cog6ToothIcon },
    { name: "Log Out", icon: PowerIcon, onClick: handleLogout }
  ]
  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[15rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h2" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <List>
        {listItems.map((item, index) => {
          return (
            <ListItem key={index} className="m-1" onClick={item.onClick}>
              <ListItemPrefix>
                <item.icon className="h-5 w-5 p-1" />
              </ListItemPrefix>
              {item.name}
              {item.suffix && <ListItemSuffix>{item.suffix}</ListItemSuffix>}
            </ListItem>
          )
        })}
      </List>
    </Card>
  )
}
