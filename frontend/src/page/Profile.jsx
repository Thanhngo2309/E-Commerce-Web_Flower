import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'



const Profile = () => {
  return (
    <div className='pt-30 min-h-screen bg-gray-100'>
    <Tabs defaultValue="profile" className="max-w-7x1 mx-auto items-center mt-10">
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="orders">Orders</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <div>
            <div className='flex flex-col justify-center items-center bg-gray-100'>
                <h1 className="text-2xl font-bold mb-7">Update Profile</h1>
                <div className='w-full flex gap-10 justify-between items-start px-7 max-w-2x1'>
                    {/* profile picture section */}
                    <div className='flex flex-col items-center'>
                        <img src="/profile.jpg" alt="profile" className='w-32 h-32 rounded-full object-cover border-4 border-pink-800' />
                        <Label className="mt-4 cursor-pointer bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700">Change Picture
                            <input type="file" accept='image/*' className='hidden' />
                        </Label>
                    </div>
                    {/* profile form section */}
                    <form className='space-y-4 shadow-lg p-7 bg-white rounded-lg '>
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <Label className="block text-sm font-medium">First Name</Label>
                                <Input type="text" name='firstName' placeholder='First Name' className='w-full border border-gray-300 px-3 py-2 mt-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500' />
                            </div>
                            <div>
                                <Label className="block text-sm font-medium">Last Name</Label>
                                <Input type="text" name='lastName' placeholder='Last Name' className='w-full border border-gray-300 px-3 py-2 mt-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500' />
                            </div>
                        </div>
                        <div>
                            <Label className="block text-sm font-medium">Email</Label>
                            <Input type="email" name='email' disabled className='w-full border border-gray-300 px-3 py-2 mt-2 cursor-not-allowed rounded-lg ' />
                        </div>
                            
                        <div>
                            <Label className="block text-sm font-medium">Phone Number</Label>
                            <Input type="text" name='phoneNo' placeholder='Enter your contact No' className='w-full border border-gray-300 mt-2 px-3 py-2  rounded-lg ' />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium">Address</Label>
                            <Input type="text" name='address' placeholder='Enter your address' className='w-full border border-gray-300 mt-2 px-3 py-2  rounded-lg ' />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium">City</Label>
                            <Input type="text" name='city' placeholder='Enter your city' className='w-full border border-gray-300 mt-2 px-3 py-2  rounded-lg ' />
                        </div> 
                        <div>
                            <Label className="block text-sm font-medium">Zip Code</Label>
                            <Input type="text" name='zipCode' placeholder='Enter your zip code' className='w-full border border-gray-300 mt-2 px-3 py-2  rounded-lg ' />
                        </div>
                       <Button type="submit" className="w-full bg-pink-600 text-white font-semibold py-2 mt-4 hover:bg-pink-700">Update Profile</Button>
                    </form>
                </div>
            </div>
        </div>
      </TabsContent>
      <TabsContent value="orders">
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>
              Track performance and user engagement metrics. Monitor trends and
              identify growth opportunities.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            Page views are up 25% compared to last month.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="reports">
        <Card>
          <CardHeader>
            <CardTitle>Reports</CardTitle>
            <CardDescription>
              Generate and download your detailed reports. Export data in
              multiple formats for analysis.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            You have 5 reports ready and available to export.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>
              Manage your account preferences and options. Customize your
              experience to fit your needs.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            Configure notifications, security, and themes.
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
    </div>
  )
}

export default Profile