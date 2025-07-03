import React from 'react'

function Footer() {
  return (
    <>
    {/* FOOTER */}
      <footer className="bg-gray-100 text-center text-sm py-4">
        <p className="text-gray-500">
          &copy; {new Date().getFullYear()} JobTrackr &mdash; All rights
          reserved.
        </p>
      </footer>
      </>
  )
}

export default Footer