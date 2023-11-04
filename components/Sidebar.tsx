"use client"

import {
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  CalendarDaysIcon
} from "@heroicons/react/24/solid"
import Link from "next/link"
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
      url: "/notifications",
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
    { name: "Calender", icon: CalendarDaysIcon, url: "/calender" },
    { name: "My page", icon: UserCircleIcon, url: "/mypage" },
    { name: "Settings", icon: Cog6ToothIcon, url: "/settings" },
    { name: "Log Out", icon: PowerIcon, onClick: handleLogout }
  ]
  return (
    <Card className="h-screen overflow-y-hidden max-w-[15rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h2" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <List>
        {listItems.map((item, index) => {
          return item.url ? (
            <Link
              key={index}
              href={item.url}
              className="text-inherit no-underline"
            >
              <ListItem className="mb-2">
                <ListItemPrefix>
                  <item.icon className="w-6 h-6 p-1" />
                </ListItemPrefix>
                {item.name}
                {item.suffix && <ListItemSuffix>{item.suffix}</ListItemSuffix>}
              </ListItem>
            </Link>
          ) : (
            <ListItem key={index} onClick={item.onClick} className="mb-2">
              <ListItemPrefix>
                <item.icon className="w-6 h-6 p-1" />
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
