import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../model/user';
import { Request } from '../model/request'; 
import { Announcement } from '../model/announcement';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnnouncementService } from '../services/announcement.service';
import { RequestService } from '../services/request.service';
import { UsersService } from '../services/users.service';
import { catchError, forkJoin, map, of} from 'rxjs';
import { CommonModule } from '@angular/common';
import { Result } from '../model/result';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-donor-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './donor-dashboard.component.html',
  styleUrl: './donor-dashboard.component.css'
})
export class DonorDashboardComponent implements OnInit, OnDestroy {
  user: User|null=null;
  state: string = 'available';
  selectedFile: File | null = null;
  announcements: Announcement[]=[];
  userDetails: { [userId: number]: { username: string, email: string, number: string, profile_pic: string } } = {};
  pendingRequests: Request[] = [];
  acceptedRequests :Request[]= [];
  requesterDetails: { [userId: number]: { username?: string, email?: string, number?: string, profile_pic?: string } } = {};
  activeTab: 'dashboard'|'myAnnouncements'='dashboard';
  showAnnouncementsModel=false;
  isEdit=false;
  showRequestModel=false;
  selectedAnnouncement:Announcement|null=null;
  selectedAnnCode:string |null=null;
  form: FormGroup;
  imagePreview: string |null=null;
  errorMessage:string='';
  countdowns: { [annCode: string]: string } = {};
  private countdownSubscription: NodeJS.Timeout| null = null;

  constructor(
    private announcementService: AnnouncementService,
    private requestService: RequestService,
    private userService: UsersService,
    private authenticateService: AuthenticateService,
    private fb : FormBuilder
  ){
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      quantity: ['', Validators.required],
      deadline: ['', Validators.required],
      category: ['', Validators.required],
      image: [null]
    });
  }
  ngOnInit(): void {
    this.loadUser();
    this.startCountdown();
  }
  

  ngOnDestroy(): void {
    if (this.countdownSubscription) {
      clearInterval(this.countdownSubscription);
    }
  }

  loadUser():void{
    let user_id =this.userService.getCurrentUserId();
    if (user_id != null ){ 
      this.userService.getOneUser(user_id).subscribe(
        {
          next: (res)=> {
            let user=res?.data as User;
            if (user){
              this.user=user;
              this.loadAnnouncements(); 
            }
          },
          error:(err)=> {
            console.error('Error loading user data:',err);
            this.errorMessage = 'Error while loading user data';
         } 
        }
      );
    }
    
  }

  
  loadAnnouncements(): void {
    this.announcements= [];
    if (this.user?.userId) {
      this.announcementService.getAnnByDonorIdAndState(this.user.userId, this.state).subscribe({
        next: (res: any) => {
          if (res.message === 'success') {
            this.announcements = res.data;
          } else {
            this.announcements = [];
            this.errorMessage = 'No announcements found';
          }
        },
        error: (err) => {
          console.error('Error loading my announcements:', err);
          this.announcements = [];
          this.errorMessage = 'Error while loading announcements';
        }
      });
    }
  }
  

  toggleState(state:string):void{
    this.state=state;
    this.loadAnnouncements();
  }


  loadRequests(annCode: string): void {
    this.errorMessage = '';
    this.pendingRequests = [];
    this.acceptedRequests = [];
    this.userDetails = {};
    console.log('Fetching requests for annCode:', annCode);
      this.requestService.getAnnReqByState(annCode, 'pending').subscribe({
      next: (res) => {
        console.log('Pending requests response:', res);
        if (res) {
          this.pendingRequests = res.data as Request[];
        } else {
          this.pendingRequests = [];
        }
      },
      error: () => {
        this.pendingRequests = [];
      }
    });

  
    this.requestService.getAnnReqByState(annCode, 'accepted').subscribe({
      next: (res) => {
        console.log('Pending requests response:', res);
        if (res) {
          this.acceptedRequests = res.data as Request[];
        } else {
          this.acceptedRequests = [];
        }
        this.loadUserDetails();
      },
      error: () => {
        this.acceptedRequests = [];
      }
    });
  
  }

  loadUserDetails(): void {
    
    const userIds: number[] = [];
    for (let request of this.acceptedRequests) {
      const userId = Number(request.userId);
      if (!userIds.includes(userId)) {
        userIds.push(userId);
      }
    }
    for (let userId of userIds) {
      this.userService.getOneUser(userId).subscribe({
      
        next: (res) => {
          console.log('User details:', res); 
          const user = res.data as User;
          this.userDetails[userId] = {
            username: user?.user_name || 'Unknown',
            email: user?.email || 'No email',
            number: user?.number || 'No phone',
            profile_pic: user?.profile_pic || '/assets/default-profile.jpg'
          };
        },
        error: (err) => {
          console.error('Error fetching user ' + userId + ':', err);
          this.userDetails[userId] = {
            username: 'Unknown',
            email: 'No email',
            number: 'No phone',
            profile_pic: '/assets/default-profile.jpg'
          };
        }
      });
    }
  }



 /* loadRequests(annCode: string): void {
    this.errorMessage = '';
    this.requests = [];
    this.requesterDetails = {};
    forkJoin([
      this.requestService.getAnnReqByState (annCode, 'pending'),
      this.requestService.getAnnReqByState (annCode, 'accepted')
    ]).subscribe({
      next: ([resPending, resAccepted]: [Result, Result]) => {
        if (resPending.message === 'success' && resAccepted.message === 'success') {
          const pendingData = resPending.data as Request[] || [];
          const acceptedData = resAccepted.data as Request[] || [];
          this.requests = [...pendingData, ...acceptedData];
          const userRequests = this.requests.map(request =>
            this.userService.getOneUser(request.userId).pipe(
              catchError(err => {
                console.error(`Error fetching user ${request.userId}:`, err);
                return of({ data: null });
              }),
              map(res => ({
                userId: request.userId,
                username: (res.data as User).user_name || 'Unknown',
                email: (res.data as User).email || '',
                number: (res.data as User).number || '',
                profile_pic: (res.data as User).profile_pic || '/assets/default-profile.jpg'
              }))
            )
          );
  
          forkJoin(userRequests).subscribe({
            next: (users) => {
              users.forEach(user => {
                this.requesterDetails[user.userId] = {
                  username: user.username,
                  email: user.email,
                  number: user.number,
                  profile_pic: user.profile_pic
                };
              });
            },
            error: (err) => {
              console.error('Error fetching user data:', err);
              this.errorMessage = 'Error loading requester details';
            }
          });
        } else {
          this.errorMessage = 'No requests found';
          this.requests = [];
        }
      },
      error: (err) => {
        console.error('Error loading requests:', err);
        this.errorMessage = 'Error loading requests';
        this.requests = [];
      }
    });
  }*/

 switchTab(tab: 'dashboard'|'myAnnouncements'):void{
    this.activeTab = tab;
    if (tab === 'dashboard') {
      this.state='available'; 
    }
  }

  openAnnouncementModel(announcement?:Announcement):void{
    this.showAnnouncementsModel=true;
    this.isEdit=!!announcement;
    if (announcement){
      this.selectedAnnouncement=announcement;
      this.selectedAnnCode=announcement.annCode;
      this.form.patchValue({
        title: announcement.title,
        content: announcement.content,
        quantity: announcement.quantity,
        deadline: announcement.deadline,
        category: announcement.category,
        img: null
      });
      this.imagePreview=announcement.img||null;
    }else{
      this.form.reset();
      this.selectedAnnouncement = null;
      this.selectedAnnCode = null;
      this.imagePreview = null;
    }
  }

  closeCreateAnnouncementModel():void{
    this.showAnnouncementsModel=false;
    this.isEdit=false;
    if (this.form) {
      this.form.reset();
    }
    this.selectedAnnouncement = null;
    this.selectedAnnCode = null;
    this.imagePreview = null;
  }

  openRequestModel(annCode:string):void{
    this.showRequestModel = true;
    console.log("Opening request model for announcement:", annCode);
    this.selectedAnnCode = annCode;
    this.loadRequests(annCode);

  }

  closeRequestModel(annCode:string):void{
    this.showRequestModel = false;
    this.selectedAnnCode = null;
    this.pendingRequests = [];
    this.acceptedRequests =[];
    this.errorMessage = '';

  }
  getFile(event: any): void {
    const file = event.target.files[0];
    console.log('Selected file:', this.selectedFile); 
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }



  onSubmit():void {
    if (!this.form.valid || (!this.selectedFile && !this.isEdit)) {
      this.errorMessage = 'Please fill all required fields and select an image';
      return;
    }
    const formData = new FormData();
    formData.append('donId', this.user?.userId?.toString() || '');
    formData.append('title', this.form.value.title);
    formData.append('content', this.form.value.content);
    formData.append('deadline', this.form.value.deadline);
    formData.append('quantity', this.form.value.quantity.toString());
    formData.append('category', this.form.value.category);
    if (this.selectedFile) {
      formData.append('img', this.selectedFile);
    }
    if (this.isEdit && this.selectedAnnCode) {
      formData.append('annCode', this.selectedAnnCode);
      this.announcementService.updateAnnouncement(formData).subscribe({
        next: (res) => {
          this.loadAnnouncements();
          this.closeCreateAnnouncementModel();
          this.errorMessage = '';
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Error updating announcement';
        }
      });
    } else {
      this.announcementService.createAnnouncement(formData).subscribe({
        next: (res) => {
          this.loadAnnouncements();
          this.closeCreateAnnouncementModel();
          this.errorMessage = '';
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Error creating announcement';
        }
      });
    }
  }

  deleteAnnouncement(annCode:string):void{
    this.announcementService.deleteAnnouncement(annCode).subscribe({
      next: (res) => {
        this.loadAnnouncements();
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error deleting announcement';
      }
    });
  }

  acceptRequest(request: Request): void {
    if (request.userId && request.annCode) {
      this.requestService.acceptOrRefuseRequest(request.annCode, request.userId, 'accept').subscribe({
        next: (res:any) => {
          this.loadRequests(request.annCode);
          this.errorMessage = ''; 
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Error accepting request'; 
        }
      });
    } else {
      this.errorMessage = 'Invalid request ID or missing annCode'; 
    }
  }

  
  refuseRequest(request: Request): void {
    if (request.userId && request.annCode) {
      this.requestService.acceptOrRefuseRequest(request.annCode, request.userId, 'refuse').subscribe({
        next: (res) => {
          this.loadRequests(request.annCode); 
          this.errorMessage = ''; 
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Error refusing request';
        }
      });
    } else {
      this.errorMessage = 'Invalid request ID or missing annCode'; 
  }
}
  logout():void{
    this.authenticateService.signOut();
  }

  startCountdown():void{
    this.countdowns = {};
    this.announcements.forEach(ann => {
      if (ann.deadline && ann.annCode) {
        this.countdowns[ann.annCode] = this.calculateCountdown(ann.deadline);
      }
    });
    this.countdownSubscription = setInterval(() => {
      this.announcements.forEach(ann => {
        if (ann.deadline && ann.annCode) {
          this.countdowns[ann.annCode] = this.calculateCountdown(ann.deadline);
        }
      });
    }, 1000);
  }

  calculateCountdown(deadline:string):string{
  const deadlineDate = new Date(deadline);
  const now = new Date();
  const diffMs = deadlineDate.getTime() - now.getTime();

  if (diffMs <= 0) {
    return 'Expired';
  }

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }




}
