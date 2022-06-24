#!/bin/bash
package_and_push_frontend(){
cd ./frontend
npm run package 
npm run push
}

package_and_push_backend(){
cd ./backend
gradle package
gradle push
}

package_and_push_backend &
package_and_push_frontend